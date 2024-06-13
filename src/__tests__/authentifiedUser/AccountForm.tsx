import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useAccount from "@/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const InputsSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
});

type Inputs = z.infer<typeof InputsSchema>;

const AccountForm = () => {
  const { authUser, errorFirebaseUser } =
    useContext<UserContextProvider | null>(UserContext) as UserContextProvider;
  const { getAccount, updateAccount } = useAccount(authUser);

  const client = useQueryClient();
  const {
    data: account,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["account", authUser?.uid],
    queryFn: getAccount,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ resolver: zodResolver(InputsSchema) });

  const mutation = useMutation({
    mutationFn: updateAccount,
    mutationKey: ["account", authUser?.uid],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["account", authUser?.uid] });
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    mutation.mutate({ firstname: data.firstname, lastname: data.lastname });
    navigate("/account");
  };
  //
  if (isLoading) return <p>Chargement...</p>;
  if (isError)
    return (
      <p>{import.meta.env.DEV ? error.message : "Une erreur est survenue"}</p>
    );

  return (
    <div>
      <h1>Mise à jour du compte</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <label>
          {" "}
          Prénom
          <input
            defaultValue={account?.firstname ?? ""}
            {...register("firstname", { required: true })}
          />
        </label>
        {errors.firstname && (
          <p className="text-red-400">{errors.firstname.message}</p>
        )}
        <label>
          {" "}
          Nom
          <input
            defaultValue={account?.lastname ?? ""}
            {...register("lastname", { required: true })}
          />
        </label>
        {errors.lastname && (
          <p className="text-red-400">{errors.lastname.message}</p>
        )}
        <label>
          Email d'inscription
          <input value={account?.mailSignIn ?? ""} disabled />
        </label>
        <input type="submit" value={"Mettre à jour"} />
      </form>
      {errorFirebaseUser}
    </div>
  );
};

export default AccountForm;
