import { ConfirmForm, FormActions, FormHeader, FormError } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { CalendarBlank, Clock } from "phosphor-react";

const confirmeformSchema = z.object({
 name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
 email: z.string().email().email({ message: 'Digite um e-mail válido' }),
 observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmeformSchema>

export function ConfirmStep() {
 const {
  register,
  handleSubmit,
  formState: {isSubmitting, errors },
 } = useForm<ConfirmFormData>({
  resolver: zodResolver(confirmeformSchema),
 })

 function handleConfirmScheduling(data: ConfirmFormData) {
  console.log(data)
 }
 return (
  <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
   <FormHeader>
    <Text>
     <CalendarBlank />
     20 de Março de 2023
    </Text>
    <Text>
     <Clock />
     18:00h
    </Text>
   </FormHeader>

   <label>
    <Text size="sm">Nome Completo</Text>
    <TextInput placeholder="Seu Nome" {...register('name')} />
    {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
   </label>

   <label>
    <Text size="sm">Endereço de Email</Text>
    <TextInput type="email" placeholder="joaomaria@example.com" {...register('email')} />
    {errors.email && <FormError size="sm">{errors.email.message}</FormError>}
   </label>

   <label>
    <Text size="sm">Observações</Text>
    <TextArea {...register('observations')} />
   </label>

   <FormActions>
    <Button type="button" variant="tertiary">Cancelar</Button>
    <Button type="submit" disabled={isSubmitting}>Confirmar</Button>

   </FormActions>
  </ConfirmForm>
 )
}