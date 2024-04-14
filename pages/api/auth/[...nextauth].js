import NextAuth, { getServerSession } from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import YandexProvider from "next-auth/providers/yandex";
import clientPromise from '@/lib/mongodb';

// const adminEmails = ['al.simonov20168090@yandex.ru']

const databaseName = 'Client';



export const authOptions = {

    providers: [
    YandexProvider({
        clientId: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET
    }),
    ],
    adapter: MongoDBAdapter(clientPromise, {
      Users: "ClientUsers",
      Accounts: "ClientAccounts",
      Sessions: "ClientSessions",
      VerificationTokens: "ClientVerificationTokens"
    } ),
    callbacks: {
        session: ({session, token, user}) => {      
          return session;
        },
    },
}

export default NextAuth(authOptions);

export async function isAdminRequest(req, res){
  const session = await getServerSession(req, res, authOptions);
}