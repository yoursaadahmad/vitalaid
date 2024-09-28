/* eslint-disable @typescript-eslint/no-unused-vars */
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as Sentry from "@sentry/nextjs";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  Sentry.metrics.set("user_view_register", user.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Link href="/">
            <p className="text-32-bold flex justify-start">
              <Image
                src="/assets/icons/logo.svg"
                alt="Vital Aid"
                width={1000}
                height={1000}
                className="mb-12 h-10 w-fit"
              />
              Vital <span className="text-green-500">Aid</span>
            </p>
          </Link>
          <RegisterForm user={user} />
          <p className="copyright py-12">© 2024 Vital Aid</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        alt="Patient"
        width={1000}
        height={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
