import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { user } from "../../interfaces";
import { useEffect, useState } from "react";

const schema = z.object({
  id: z.optional(z.number()),
  name: z.string().min(2),
  phone: z.string().min(2),
  email: z.string().min(2),
  username: z.string().min(2),
  website: z.string().min(1),
  agrre: z
    .string({ invalid_type_error: "You must accept the terms" })
    .transform((value) => value === "on"),
});

type FormData = z.infer<typeof schema>;
interface Props {
  onSubmit: (user: user) => void;
  user?: user | null;
  mode: "add" | "update";
}
const UserForm = ({ onSubmit, user, mode }: Props) => {
  const submitHandler = (data: user) => {
    onSubmit(data);
    resetForm();
  };

  const resetForm = () => {
    setValue("name", "");
    setValue("phone", "");
    setValue("email", "");
    setValue("username", "");
    setValue("website", "");
    setValue("agrre", false);
  };
  

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      reset(user); // Set form values with the selected user's data
    } 
  }, [user]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({  resolver: zodResolver(schema) });

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} className="row g-3">
        <input type="hidden" name="id"  />
        <div className="col-md-4">
          <input type="hidden" name="id" />
          <label htmlFor="validationServer01" className="form-label">
             Name
          </label>
          <input
            {...register("name")}
            title="name"
            className={[
              "form-control",
              errors.name ? "is-invalid" : "",
            ].join(" ")}
            type="text"
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServer02" className="form-label">
            Phone
          </label>
          <input
            {...register("phone")}
            className={[
              "form-control",
              errors.phone ? "is-invalid" : "",
            ].join(" ")}
            type="number"
          />
          <div className="invalid-feedback">{errors.phone?.message}</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServerUsername" className="form-label">
            Username
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend3">
              @
            </span>
            <input
              {...register("username")}
              className={[
                "form-control",
                errors.username ? "is-invalid" : "",
              ].join(" ")}
              type="text"
              aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationServer03" className="form-label">
            Email
          </label>
          <input
            {...register("email")}
            className={["form-control", errors.email ? "is-invalid" : ""].join(
              " "
            )}
            type="text"
            aria-describedby="validationServer03Feedback"
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationServer03" className="form-label">
            Website
          </label>
          <input
            {...register("website")}
            className={["form-control", errors.website ? "is-invalid" : ""].join(
              " "
            )}
            type="text"
            aria-describedby="validationServer03Feedback"
          />
          <div className="invalid-feedback">{errors.website?.message}</div>
        </div>
        {/* <div className="col-md-3">
          <label htmlFor="validationServer04" className="form-label">
            State
          </label>
          <select
            defaultValue=""
            {...register("state")}
            className={["form-select", errors.state ? "is-invalid" : ""].join(
              " "
            )}
          >
            <option value="" disabled>
              Choose
            </option>
            <option value="US">US</option>
            <option value="IR">IR</option>
            <option value="ES">ES</option>
            <option value="EN">EN</option>
          </select>
          <div className="invalid-feedback">{errors.state?.message}</div>
        </div> */}

        <div className="col-12">
          <div className="form-check">
            <input
              {...register("agrre")}
              defaultValue={1}
              className={[
                "form-check-input",
                errors.agrre ? "is-invalid" : "",
              ].join(" ")}
              type="checkbox"
              aria-describedby="invalidCheck3Feedback"
            />
            <label className="form-check-label" htmlFor="invalidCheck3">
              Agree to terms and conditions
            </label>
            <div className="invalid-feedback">{errors.agrre?.message}</div>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            {mode == "add" ? "Add User" : "Update User"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
