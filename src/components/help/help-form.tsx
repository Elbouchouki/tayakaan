
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import useLangStore from "@/store/langagueStore"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"

const HelpForm = () => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  const FormSchema = z.object({
    email: z.string().email({
      message: dict?.FromSchemaValidation.invalidEmailAddress || "Invalid email address.",
    }),
    content: z.string().nonempty({
      message: dict?.FromSchemaValidation.thisFieldCantBeEmpty || "This field can't be empty.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    toast.success(dict?.yourMessageHasBeenSentSuccessfully || "Your message has been sent successfully", {
      description: dict?.weWillGetBackToYouAsSoonAsPossible || "We will get back to you as soon as possible"
    })
    form.setValue("email", "")
    form.setValue("content", "")
  }
  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col w-full gap-3">
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  {
                    dict?.email || "Email"
                  }
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn({
                      "text-right": langStore?.rtl
                    })}
                    placeholder="e.g elbouchouki@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  {
                    dict?.howCanweHelp || "How can we help?"
                  }
                </FormLabel>
                <FormControl>
                  <Textarea
                    className={cn({
                      "text-right": langStore?.rtl
                    })}
                    rows={5}
                    placeholder={
                      dict?.helpExample || "e.g I have a problem with my account"
                    } {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={cn("mt-3", {
          "flex flex-row-reverse": langStore?.rtl
        })}>
          <Button type="submit">
            {
              dict?.sendMessage || "Send Message"
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default HelpForm