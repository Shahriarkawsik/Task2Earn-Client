import SectionHeading from "../SectionHeading";

const Collapse = () => {
  return (
    <section className="w-11/12 lg:w-10/12 mx-auto space-y-5">
      <SectionHeading title={"Q/A 💬"} />
      <div className="lg:w-2/3 mx-auto space-y-6 font-Inter">
        <div className="space-y-3">
          {/* Collapse */}
          <h1 className="sm:text-2xl font-Cinzel font-semibold">
            💡 General Questions:
          </h1>
          {/* question -1 */}
          <div
            tabIndex={0}
            className="collapse collapse-plus border-base-300 bg-base-200 border"
          >
            <div className="collapse-title  sm:text-xl font-medium">
              Q1: What is the best way to complete tasks quickly and
              efficiently?
            </div>
            <div className="collapse-content">
              <p className="text-justify">
                <strong> A: </strong>
                Read the task instructions carefully before starting. Prioritize
                high-paying and easy-to-complete tasks. Use time management
                techniques like the Pomodoro method to stay focused. Always
                double-check your submission to avoid rejections.
              </p>
            </div>
          </div>
          {/* question -2 */}
          <div
            tabIndex={0}
            className="collapse collapse-plus border-base-300 bg-base-200 border"
          >
            <div className="collapse-title  sm:text-xl font-medium">
              Q2: How do I find high-paying tasks on Taskzy?
            </div>
            <div className="collapse-content">
              <p className="text-justify sm: text-xl">
                <strong> A: </strong>
                Go to the Task List section and sort tasks by payable amount.
                Look for tasks labeled as Featured or Top-Paying. Also,
                regularly check trending tasks, as they often have better
                payouts.
              </p>
            </div>
          </div>
          {/* question -3 */}
          <div
            tabIndex={0}
            className="collapse collapse-plus border-base-300 bg-base-200 border"
          >
            <div className="collapse-title  sm:text-xl font-medium">
              Q3: What should I do if my task submission gets rejected?
            </div>
            <div className="collapse-content">
              <p className="text-justify sm: text-xl">
                <strong> A: </strong>
                First, check the reason for rejection. If its a valid mistake,
                correct it and resubmit if possible. If you believe the
                rejection was unfair, you can contact the buyer or report the
                issue to Taskzy support.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="sm:text-2xl font-Cinzel font-semibold">
            💰 Payment & Earnings:
          </h1>

          {/* question -4 */}
          <div
            tabIndex={0}
            className="collapse collapse-plus border-base-300 bg-base-200 border"
          >
            <div className="collapse-title  sm:text-xl font-medium">
              Q4: How does Taskzy handle payments for completed tasks?
            </div>
            <div className="collapse-content">
              <p className="text-justify sm: text-xl">
                <strong> A: </strong>
                When a buyer approves your submission, the payable amount is
                added to your Taskzy wallet. Once you reach the minimum
                withdrawal amount, you can request a withdrawal through
                supported payment methods.
              </p>
            </div>
          </div>
          {/* question -5 */}
          <div
            tabIndex={0}
            className="collapse collapse-plus border-base-300 bg-base-200 border"
          >
            <div className="collapse-title  sm:text-xl font-medium">
              Q5: When will I receive my earnings after task approval?
            </div>
            <div className="collapse-content">
              <p className="text-justify sm: text-xl">
                <strong> A: </strong>
                Earnings are instantly credited to your account after the buyer
                approves your submission. However, withdrawals may take 24-48
                hours to process, depending on the payment method.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collapse;
