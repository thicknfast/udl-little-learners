import Image from "next/image";
import { Container } from "@/components/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Jeff Horwitz",
  description:
    "Jeff Horwitz is an educator with more than two decades of experience, a consultant with Novak Education, and author of UDL for Little Learners.",
};

export default function About() {
  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col items-start gap-10 md:flex-row md:gap-16">
          {/* Headshot */}
          <div className="mx-auto shrink-0 md:mx-0">
            <div className="relative h-72 w-72 overflow-hidden rounded-2xl bg-blue/10 shadow-lg">
              <Image
                src="/images/headshot-2026.jpg"
                alt="Jeff Horwitz"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <Image
                src="/images/hcg-logo.png"
                alt="Horwitz Consulting Group"
                width={120}
                height={120}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <h1 className="font-display text-3xl font-extrabold text-blue sm:text-4xl">
              About Jeff Horwitz
            </h1>
            <div className="mt-6 space-y-4 text-text-light leading-relaxed">
              <p>
                Jeff Horwitz is an educator with more than two decades of experience and the author
                of <em>UDL for Little Learners</em> (Wiley/Jossey-Bass, December 2026). He currently
                works for <strong className="text-text">Novak Education</strong>, where he consults
                for and with schools around the world. He also leads{" "}
                <strong className="text-text">Horwitz Consulting Group</strong>, his own practice
                supporting schools and early childhood programs.
              </p>
              <p>
                Before consulting, Jeff taught kindergarten through third grade in public and private
                schools and served as an early childhood director and principal at independent schools
                in St. Louis. He believes strongly that all children deserve a high-quality education
                and that the social-emotional lives of children are equally as important as the
                academic.
              </p>
              <p>
                Jeff holds{" "}
                <strong className="text-text">Learning Designed Level 1 and Level 2 UDL credentials</strong>.
                He specializes in helping leaders implement the shift to student-centered learning,
                and he loves giving teachers practical strategies they can employ immediately. He
                enjoys collaborating with teachers on how to create equitable, authentic learning
                experiences and how to engage parents in the process. He has presented at many
                conferences and schools, including <strong className="text-text">ISTE</strong>.
              </p>
              <p className="italic">
                When Jeff is not immersed in schools, he is spending time with his two children,
                cooking, out on the golf course, or playing music with his friends.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
