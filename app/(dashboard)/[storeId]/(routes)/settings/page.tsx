import { db } from "@/lib/firebase";
import { Store } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import { doc, getDoc } from "firebase/firestore";
import { Settings } from "lucide-react";
import { redirect } from "next/navigation";
import { use } from "react";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps{
    params : {
        storeId: string
    }
}


const SettingsPage = async ({params}: SettingsPageProps) => {

    const {userId} = auth()

    if(!userId){
        redirect("/sign-in")
    }

    const store = (await getDoc(doc(db, "stores", params.storeId))
    ).data() as Store

    if(!store || store.userId !== userId) {
        redirect("/")
    }

    return <div className="flex-col">
        <div className="flex-1 space-y-5 p-8 pt-6">
            <SettingsForm initialData={store}/>
        </div>
    </div>
};

export default SettingsPage;