import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import {Billboards} from "@/types-db"
import { BillboardForm } from "./_components/billboard-form";

const BillboardPage = async ({
    params}: {params: { storeId : string ,billboardId: string}}) => {
        const billboard = (await getDoc(doc(db, "stores", params.storeId,
            "billboards", params.billboardId
        ))).data() as Billboards;

        console.log(billboard)
        console.log("------------AGAIN___________")

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardForm initialData={billboard}></BillboardForm>
        </div>
    );
}

export default BillboardPage; 