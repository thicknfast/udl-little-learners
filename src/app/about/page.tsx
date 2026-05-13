import Image from "next/image";
import { Container } from "@/components/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Jeff Horwitz",
  description:
    "Jeff Horwitz is a 20-year educator, UDL advocate, and author of UDL for Little Learners.",
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
                src="/images/headshot.jpg"
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
                Jeff is a 20-year educator and has been an administrator at independent schools
                in St. Louis since 2013. He is passionate that all children deserve a high-quality
                education and believes strongly in surrounding students with passionate adults that
                can provide a personalized, 21st-century education, with authentic learning
                experiences, and use technology as a tool.
              </p>
              <p>
                He believes that the social-emotional lives of children are equally as important as
                the academic and that empathy and collaboration are cornerstone skills for the
                future. Jeff holds a{" "}
                <strong className="text-text">Learning Designed Level 1 UDL and Level 2 UDL credential</strong>.
              </p>
              <p>
                Prior to becoming an administrator, Jeff taught kindergarten through third grade in
                public and private schools. He is passionate about providing students with
                opportunities for learning that will prepare them for the increasingly automated
                world we live in. He is skilled at using technology as a creation, communication,
                collaboration and teaching tool.
              </p>
              <p>
                Jeff is an advocate for Project Based Learning and Universal Design for Learning
                and has presented at many conferences and schools including{" "}
                <strong className="text-text">ISTE</strong>,{" "}
                <strong className="text-text">BLC</strong>, and{" "}
                <strong className="text-text">METC</strong>.
                His work has been included in publications and journals.
              </p>
              <p>
                Jeff enjoys collaborating with teachers on how to create equitable, authentic
                learning experiences, how to use technology to enhance their teaching, how to use
                student-centered techniques to prepare students for the world they will inherit,
                and how to engage parents in the process.
              </p>
              <p>
                As an administrator, Jeff has developed a 21st-century/vision-minded curriculum,
                instituted standards-based grading, written strategic plans, created and designed a
                Makerspace and curriculum, and managed change for the organization around these
                initiatives.
              </p>
              <p className="italic">
                When Jeff is not immersed in schools he is spending time with his two children,
                cooking, out on the golf course, or playing music with his friends.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
