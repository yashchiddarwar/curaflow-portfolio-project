
import Image from "next/image";
import PatientForm from "@/components/Forms/PatientForm";
import Link from "next/link";


export default function Home() {
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px]">
                    <Image src="/assets/icons/logo-full.svg"
                           height={1000}
                           width={1000}
                           alt="logo"
                           className="mb-12 h-10 w-fit"
                    />
                    <PatientForm/>
                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">
                            © 2024 Careflow All Rights Reserved
                        </p>
                        <Link href="/?admin=true" className="text-green-500">
                            Admin
                        </Link>
                    </div>
                </div>
            </section>

            <Image
                src="/assets/images/onboarding-img.png"
                alt="patient"
                height={1000}
                width={1000}
                className="side-img max-w-[50%]"
            />
        </div>
    );
}
