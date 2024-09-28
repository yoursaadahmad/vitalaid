/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as Sentry from "@sentry/nextjs";
import { getUser } from "@/lib/actions/patient.actions";

const SuccessPage = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );

  const user = await getUser(userId);

  Sentry.metrics.set("user_view_appointment-success", user.name);

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <p className="text-32-bold flex justify-start">
            <Image
              src="/assets/icons/logo.svg"
              alt="Vital Aid"
              width={1000}
              height={1000}
              className="h-10 w-fit"
            />
            Vital <span className="text-green-500">Aid</span>
          </p>
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="Success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            <span className="text-green-500">Appointment</span> created
            successfully
          </h2>
          <p>Thank you, We will be in touch soon</p>
        </section>
        <section className="request-details">
          <p>Requested Appointment Details</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="Doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="Calendar"
              width={24}
              height={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className="copyright">© 2024 Vital Aid</p>
      </div>
    </div>
  );
};

export default SuccessPage;
