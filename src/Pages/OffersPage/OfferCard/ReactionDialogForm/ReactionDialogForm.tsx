import type {
  OfferStatus,
  OfferWithVacancyDto,
} from "../../../../Models/Offer";
import classes from "./reaction_dialog_form_styles.module.css";
import reusableClasses from "./../../../../global_styles/reusable.module.css";
import formClasses from "./../../../../global_styles/reusable_form_styles.module.css";
import * as Yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { InferType } from "yup";
import { setJobseekerReactionToOfferAPI } from "../../../../Services/OfferService";
import clsx from "clsx";
import { useDialogContext } from "../../../../Context/DialogWindowContext";
import { useQueryClient } from "@tanstack/react-query";

type Props = { offer: OfferWithVacancyDto; newStatus: OfferStatus };

const validation = Yup.object().shape({
  reaction: Yup.string().required("Comment is required").min(3, "Too short"),
});

const ReactionForm = (props: Props) => {
  const { offer, newStatus } = props;
  const { onSubmit } = useDialogContext();
  const client = useQueryClient();

  type ReactionFormType = InferType<typeof validation>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReactionFormType>({ resolver: yupResolver(validation) });

  const handleSubmitReaction = async (form: ReactionFormType) => {
    await setJobseekerReactionToOfferAPI(
      offer.jobseekerId,
      offer.vacancyId,
      newStatus,
      form.reaction
    );
    client.invalidateQueries({ queryKey: ["offers"] });
    onSubmit();
  };

  return (
    <section className={formClasses["form__container"]}>
      <h1
        className={clsx(
          formClasses["form__heading"],
          classes["reaction-dialog__heading"]
        )}
      >
        Leave a response message
      </h1>
      <form
        onSubmit={handleSubmit(handleSubmitReaction)}
        className={formClasses["form"]}
      >
        <div className={formClasses["form__input-block"]}>
          <textarea
            className={reusableClasses["dynamic-textarea-field"]}
            id="reactionMsg"
            placeholder="Message"
            rows={3}
            {...register("reaction")}
          />
          {errors.reaction ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.reaction.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          className={clsx(reusableClasses["btn"], classes["ok-btn"])}
          type="submit"
        >
          Ok
        </button>
      </form>
    </section>
  );
};

export default ReactionForm;
