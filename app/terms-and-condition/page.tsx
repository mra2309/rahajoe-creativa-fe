import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <section className="w-full bg-[#F8F8F8] h-auto pt-32 md:pt-52 pb-20 md:pb-40 space-y-5 px-5 md:px-0">
        <div className="max-w-5xl mx-auto pb-4 md:pb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Terms & Conditions</h1>
        </div>
        <div className="max-w-5xl mx-auto space-y-2 md:space-y-4 p-6 md:p-8 bg-white rounded-lg border border-zinc-200">
          <h1 className="font-semibold">PRICE</h1>
          <ul className="list-disc pl-4 space-y-2 text-sm md:text-base">
            <li>
              The price offered is the promotional price. Prices can change at
              any time. 
            </li>
            <li>
              A deposit of 50% of the price cannot be withdrawn if the client
              cancels the project. 
            </li>
            <li>
              The deposit will be returned if the project cancellation comes
              from the designer&apos;s side.
            </li>
          </ul>
        </div>
        <div className="max-w-5xl mx-auto space-y-2 md:space-y-4 p-6 md:p-8 bg-white rounded-lg border border-zinc-200">
          <h1 className="font-semibold">Unlimited Revision</h1>
          <div>
            <p className="mb-2 text-sm md:text-base">
              There are some exceptions, in this case, we will not make
              revisions:
            </p>
            <ul className="list-disc pl-4 space-y-2 text-sm md:text-base">
              <li>
                The concept changes after the client approve the final design
                and have received the final file delivery.
              </li>
              <li>
                Post-approval revisions can be made and are subject to a fee at
                one stage of the revision request.
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-5xl mx-auto space-y-2 md:space-y-4 p-6 md:p-8 bg-white rounded-lg border border-zinc-200">
          <h1 className="font-semibold">Design Process</h1>
          <ul className="list-disc pl-4 space-y-2 text-sm md:text-base tracking-wide">
            <li>
              We strive to provide the first draft designs on an agreed time
              scale on business days. Please note that Sundays and public
              holidays do not include business days. Please provide clear and
              constructive feedback regarding the design.
            </li>
            <li>
              If within 60 days the client does not return since the last design
              proposal was submitted, then we consider the project has been
              canceled by the client.
            </li>
          </ul>
        </div>
        <div className="max-w-5xl mx-auto space-y-4 p-6 md:p-8 bg-white rounded-lg border border-zinc-200">
          <h1 className="font-semibold">
            We reserve the right to charge extra fees where:
          </h1>
          <ul className="list-disc pl-4 space-y-2 text-sm md:text-base tracking-wide">
            <li>
              The client asks for a change of name or asks for a series of new
              designs that come out of the brief that the client gave when
              started.
            </li>
            <li>
              The client asks to complete the design in a faster time. We are
              happy to do this. We will charge for the design process request
              faster than the agreed time.
            </li>
          </ul>
        </div>
        <div className="max-w-5xl mx-auto space-y-2 md:space-y-4 p-6 md:p-8 bg-white rounded-lg border border-zinc-200">
          <h1 className="font-semibold">
            ALL REJECTED CONCEPTS ARE STILL THE PROPERTY OF THE DESIGNER.
          </h1>
        </div>
      </section>
      <Footer />
    </>
  );
}
