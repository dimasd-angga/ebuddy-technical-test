import { firestore } from '../config/firebaseConfig';
import { User } from '../entities/user';
import admin from 'firebase-admin';

export class UserRepository {
    private collection = firestore.collection('USERS');

    async createUser(userData: User): Promise<User> {

        const userRecord = await admin.auth().createUser({
            email: userData.email,
            password: userData.password,
            displayName: `${userData.firstName} ${userData.lastName}`
        });

        const { password, ...userDataToStore } = userData;

        const userDoc = {
            ...userDataToStore,
            id: userRecord.uid,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await this.collection.doc(userRecord.uid).set(userDoc);

        return userDoc as User;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const querySnapshot = await this.collection
            .where('email', '==', email)
            .limit(1)
            .get();

        if (querySnapshot.empty) {
            return null;
        }

        const userDoc = querySnapshot.docs[0];
        return { id: userDoc.id, ...userDoc.data() } as User;
    }

    async updateUser(userId: string, userData: Partial<User>): Promise<User> {
        const userRef = this.collection.doc(userId);
        await userRef.update({
            ...userData,
            updatedAt: new Date()
        });

        const updatedUser = await userRef.get();
        return { id: updatedUser.id, ...updatedUser.data() } as User;
    }

    async fetchUser(userId: string): Promise<User | null> {
        const userDoc = await this.collection.doc(userId).get();

        if (!userDoc.exists) {
            return null;
        }

        return { id: userDoc.id, ...userDoc.data() } as User;
    }

    async fetchAllUsers(page: number = 1, pageSize: number = 10): Promise<{
        users: User[],
        pagination: {
            currentPage: number,
            pageSize: number,
            hasMore: boolean,
            totalCount: number
        }
    }> {
        try {
            const countSnapshot = await this.collection.count().get();
            const totalCount = countSnapshot.data().count;

            let query = this.collection.orderBy('createdAt', 'desc');

            if (page > 1) {
                const skipDocs = (page - 1) * pageSize;
                const snapshotForPagination = await this.collection
                    .orderBy('createdAt', 'desc')
                    .limit(skipDocs)
                    .get();

                if (snapshotForPagination.docs.length > 0) {
                    const lastDoc = snapshotForPagination.docs[snapshotForPagination.docs.length - 1];
                    query = query.startAfter(lastDoc);
                }
            }

            const usersSnapshot = await query.limit(pageSize + 1).get();

            const hasMore = usersSnapshot.docs.length > pageSize;
            const users: User[] = [];

            const docsToUse = hasMore ? usersSnapshot.docs.slice(0, pageSize) : usersSnapshot.docs;

            docsToUse.forEach(doc => {
                users.push({ id: doc.id, ...doc.data() } as User);
            });

            return {
                users,
                pagination: {
                    currentPage: page,
                    pageSize,
                    hasMore,
                    totalCount
                }
            };
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }
    }
}