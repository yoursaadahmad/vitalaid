/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import PatientForm from "@/components/forms/PatientForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId);
  Sentry.metrics.set("user_view_new-appointment", patient.name);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
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
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
          <p className="copyright text-14 py-12">© 2024 Vital Aid</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        alt="Appointment"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
