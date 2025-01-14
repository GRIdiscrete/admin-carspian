"use client"

import { useRouter } from "next/navigation"
import { OrderColumns } from "./columns"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Car, Copy, Edit, Home, MoreVertical, Phone, Trash } from "lucide-react"
import { DropdownMenuContent,  DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import toast from "react-hot-toast"
import axios from "axios"
import { AlertModal } from "@/components/modal/alert-modal"

interface CellActionProps {
    data: OrderColumns
}

export const    CellAction = ({data}: CellActionProps) => {
    const router = useRouter()
    const params = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)

     const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Phone number copied to clipboard")
     }

     const onDelete = async() => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/${params.storeId}/orders/${data.id}`);


            toast.success("Order Removed");
            router.push(`/${params.storeId}/orders`);
            router.refresh();


        } catch (error) {
            toast.error("Something went wrong");
        }
        finally{
            setIsLoading(false)
            setOpen(false);
        }
    }

    const onUpdate = async (data:any) => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/${params.storeId}/orders/${data.id}`, data);
            router.push(`/${params.storeId}/orders`)
            location.reload();
            toast.success("Order Updated")
        } catch (error) {
            toast.error("Something Went Wrong")
        }finally{
            router.refresh();
            setIsLoading(false)
        }
    }
  
  
    return <>
        <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading} />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="h-8 w-8 p-0" variant={"ghost"}>
                    <span className="sr-only">Open</span>
                    <MoreVertical className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onCopy(data.id)}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Client
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdate({id: data.id, 
                    order_status: 'Delivering'
                })}>
                    <Car className="h-4 w-4 mr-2" />
                    Delivering
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdate({id: data.id, 
                    order_status: 'Delivered'
                })}>
                    <Home className="h-4 w-4 mr-2" />
                    Delivered
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdate({id: data.id, 
                    order_status: 'Processing'
                })}>
                    <Home className="h-4 w-4 mr-2" />
                    Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className="h-4 w-4 mr-2" />
                    Decline
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}
