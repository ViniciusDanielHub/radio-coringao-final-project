"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { container } from "@/application/services/container";
import { CommentInput, CommentInputSchema } from "@/application/dto";

interface CommentFormProps {
  articleSlug: string;
}

export function CommentForm({ articleSlug }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentInput>({
    resolver: zodResolver(CommentInputSchema),
  });

  const onSubmit = async (data: CommentInput) => {
    await container.addComment.execute(data, articleSlug);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-stack-md"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-1 block font-label-sm text-label-sm text-primary"
        >
          NOME
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={`w-full border-b-2 bg-transparent px-0 py-2 font-body-md text-body-md text-primary placeholder:text-on-surface-variant focus:outline-none ${
            errors.name
              ? "border-error"
              : "border-primary focus:border-secondary"
          }`}
          placeholder="Seu nome"
        />
        {errors.name && (
          <span className="mt-1 block font-label-sm text-label-sm text-error">
            {errors.name.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="comment"
          className="mb-1 block font-label-sm text-label-sm text-primary"
        >
          COMENTÁRIO
        </label>
        <textarea
          id="comment"
          rows={4}
          {...register("comment")}
          className={`w-full resize-none border-b-2 bg-transparent px-0 py-2 font-body-md text-body-md text-primary placeholder:text-on-surface-variant focus:outline-none ${
            errors.comment
              ? "border-error"
              : "border-primary focus:border-secondary"
          }`}
          placeholder="Escreva seu comentário..."
        />
        {errors.comment && (
          <span className="mt-1 block font-label-sm text-label-sm text-error">
            {errors.comment.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="self-end border-2 border-primary bg-transparent px-8 py-3 font-label-sm text-label-sm uppercase text-primary transition-colors hover:bg-primary hover:text-on-primary disabled:cursor-not-allowed disabled:border-outline disabled:text-outline"
      >
        {isSubmitting ? "Enviando..." : "Comentar"}
      </button>
    </form>
  );
}