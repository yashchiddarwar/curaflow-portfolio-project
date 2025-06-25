'use client'
import SubmitButton from "@/components/ui/SubmitButton";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {
    Form, FormControl
} from "@/components/ui/form"
import CustomFormField from "@/components/ui/CustomFormField";
import {useState} from "react";
import {UserFormValidation} from "@/lib/validation";
import {createUser} from "@/lib/actions/patients.actions";
import {useRouter} from "next/navigation"; // ✅ Correct import
import {FormFieldTypes} from "@/components/Forms/PatientForm";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Doctors, GenderOptions, IdentificationTypes} from "@/constants";
import {Label} from "@/components/ui/label";
import {SelectItem} from "@/components/ui/select";
import Image from "next/image";


const RegisterForm = ({user}: { user: User }) => {
    const router = useRouter();
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
            <section className="space-y-4">
                <h1 className="header"> Welcome 👋</h1>
                <p className="text-dark-700"> Let us know more about yourself. </p>
            </section>

            <section className="space-y-6">
                <div className="mb-9 space-y-12">
                    <h2 className="sub-header"> Personal Information </h2>
                </div>
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

            <div className="flex flex-col gap-6 xl:flex-row">
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
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldTypes.DATE_PICKER}
                    control={form.control}
                    name="birthdate"
                    label="Date of Birth"
                    iconSrc="/assets/icons/calender.svg"
                    iconAlt="user"
                />

                <CustomFormField
                    fieldType={FormFieldTypes.SKELETON}
                    control={form.control}
                    name="gender"
                    label="Gender"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <RadioGroup
                                className="flex h-11 gap-6 xl:justify-between"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                {GenderOptions.map((option) => (
                                    <div key={option} className="radio-group">
                                        <RadioGroupItem value={option} id={option}/>
                                        <Label htmlFor={option} className="cursor-pointer">
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    )}
                />
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="24 Street, New York"
                    iconSrc="/assets/icons/address.svg"
                    iconAlt="user"
                />

                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="occupation"
                    label="Occupation"
                    placeholder="Plumber"
                    iconSrc="/assets/icons/occupation.svg"
                    iconAlt="user"
                />
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="emergencyContactName"
                    label="Emergency Contact Name"
                    placeholder="Guardians/Parents/Friends"
                />

                <CustomFormField
                    fieldType={FormFieldTypes.PHONE_INPUT}
                    control={form.control}
                    name="emergencyContactNumber"
                    label="Emergency Contact Number"
                    placeholder="{+91} 98988 90998"
                />
            </div>

            <section className="space-y-6">
                <div className="mb-9 space-y-12">
                    <h2 className="sub-header"> Medical Information </h2>
                </div>
            </section>

            <CustomFormField
                fieldType={FormFieldTypes.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Primary Physician"
                placeholder="Select a physician">
                {Doctors.map((doctor) => (
                    <SelectItem value={doctor.name} key={doctor.name}>
                        <div className="flex cursor-pointer items-center gap-2">
                            <Image src={doctor.image}
                                    height={32}
                                    width={32}
                                    alt={doctor.name}
                                    className="rounded-full  border-dark-500"
                            />
                            <p>{doctor.name}</p>
                        </div>
                    </SelectItem>
                ))}
            </CustomFormField>

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="insuranceProvider"
                    label="Insurance Provider"
                    placeholder="Max Bupa Health Insurance"
                />

                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="insurancePolicyNumber"
                    label="Insurance Policy Number"
                    placeholder="CSJJS8133"
                />
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldTypes.TEXTAREA}
                    control={form.control}
                    name="allergies"
                    label="Allergies(if any)"
                    placeholder="Pollen, Peanuts, Shellfish etc"
                />

                <CustomFormField
                    fieldType={FormFieldTypes.TEXTAREA}
                    control={form.control}
                    name="currentMedication"
                    label="Current Medication"
                    placeholder="Diazepam, Naproxen, Metformin etc"
                />
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldTypes.TEXTAREA}
                    control={form.control}
                    name="familyMedicalHistory"
                    label="Family Medical History"
                    placeholder="Father had Alzheimer's, Mother had Parkinson's"
                />

                <CustomFormField
                    fieldType={FormFieldTypes.TEXTAREA}
                    control={form.control}
                    name="pastMedicalHistory"
                    label="Past Medical History"
                    placeholder="Strokes 2 years ago, operations"
                />
            </div>

            <section className="space-y-6">
                <div className="mb-9 space-y-12">
                    <h2 className="sub-header"> Identification and Verification </h2>
                </div>
            </section>

            <CustomFormField
                fieldType={FormFieldTypes.SELECT}
                control={form.control}
                name="identificationType"
                label="Identification Type"
                placeholder="Select an identification type">
                {IdentificationTypes.map((identification) => (
                    <SelectItem value={identification} key={identification}>
                        <div className="flex cursor-pointer items-center gap-2">
                            <p>{identification}</p>
                        </div>
                    </SelectItem>
                ))}
            </CustomFormField>

            <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="identificationNumber"
                label="Identification Number"
                placeholder="Ex 123456789"
            />

            <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
    </Form>;
}

export default RegisterForm;