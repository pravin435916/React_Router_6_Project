import { deleteContact } from "../contacts";
import { redirect } from "react-router-dom";

export async function action({params}) {
    throw new Error("Oh shit !");
    await deleteContact(params.contactId);
    return redirect("/")
}