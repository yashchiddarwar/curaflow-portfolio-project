'use client'
import SubmitButton from "@/components/ui/SubmitButton";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {
    Form
} from "@/components/ui/form"
import CustomFormField from "@/components/ui/CustomFormField";
import {useState} from "react";
import {UserFormValidation} from "@/lib/validation";
import {createUser} from "@/lib/actions/patients.actions";
import {useRouter} from "next/navigation"; // ✅ Correct import
import {users} from "@/lib/appwrite.config";
import {ID, Query} from "node-appwrite";

export enum FormFieldTypes {
    INPUT = "input",
    SELECT = "select",
    TEXTAREA = "textarea",
    CHECKBOX = "checkbox",
    PHONE_INPUT = "phoneInput",
    DATE_PICKER = "datePicker",
    SKELETON = "skeleton",
    EMAIL = "email",
    PASSWORD = "password",
}

const PatientForm = () => {
    const router = useRouter(); // ✅ Use the hook
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
        setIsLoading(true);

        try {
            const userData = {name, email, phone};
            const user = await createUser(userData);
            if (user) {
                router.push(`/patients/${user.$id}/register`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); // ✅ Always reset loading state
        }
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
                <h1 className="header"> Hi there! 👋</h1>
                <p className="text-dark-700"> Book your first appointment. </p>
            </section>

            <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="name"
                label="Full Name"
                placeholder="John Doe"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
            />

            <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="user"
            />

            <CustomFormField
                fieldType={FormFieldTypes.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone Number"
                placeholder="{+91} 98988 90998"
            />

            <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
    </Form>;
}

export default PatientForm;