"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Truck, BadgeCheck, Clock, Package } from "lucide-react";
import emailjs from "@emailjs/browser";

// Validation schema for form fields
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  phone: z.string().optional(),
  countryCode: z.string(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      countryCode: "+91",
      message: "",
    },
  });

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    try {
      // EmailJS configuration
      const serviceID = "service_jp72ckh";
      const templateID = "template_cqvpvmj";
      const publicKey = "Y3Wbg1mfdbSl_hAGI";
      const body = {
        name: data.name,
        email: data.email,
        phoneNumber:
          data.phone && data.countryCode
            ? `${data.countryCode}${data.phone}`
            : "N/A",
        message: data.message,
      };

      // Sending email using EmailJS
      await emailjs.send(serviceID, templateID, body, publicKey);

      // Success toast notification
      toast({
        title: "Enquiry Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      // Error toast notification
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Why Partner Section */}
        <div>
          <h2 className="text-2xl font-semibold text-red-500">Reach Us For.</h2>

          <div className="bg-gray-50 p-4 rounded-lg space-y-4 md:h-[70%]">
            <div className="flex items-center gap-3">
              <Package className="text-red-500 w-5 h-5" />
              <div>
                <p className="font-semibold">Bulk Orders</p>
                <p className="text-sm text-gray-600">
                  Get bulk orders at a discounted price.
                </p>
                <p className="text-sm text-gray-600">
                  For support, email us at{" "}
                  <a
                    href="mailto:support@pixelCraftgears.com"
                    className="text-red-500 "
                  >
                    support@pixelCraftgears.com
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BadgeCheck className="text-red-500 w-5 h-5" />
              <div>
                <p className="font-semibold">Premium Quality</p>
                <p className="text-sm text-gray-600">100% quality inspection</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Truck className="text-red-500 w-5 h-5" />
              <div>
                <p className="font-semibold">Fast Delivery</p>
                <p className="text-sm text-gray-600">
                  Priority shipping for bulk orders
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="text-red-500 w-5 h-5" />
              <div>
                <p className="font-semibold">Quick Response</p>
                <p className="text-sm text-gray-600">
                  24-hour quote turnaround
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Business Enquiry Form</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Full Name"
                        className="border-gray-300 focus:border-red-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email Address"
                        className="border-gray-300 focus:border-red-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem className="w-24">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:border-red-500">
                            <SelectValue placeholder="+91" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="+91">+91</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                          <SelectItem value="+44">+44</SelectItem>
                          <SelectItem value="+86">+86</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Phone Number (Optional)"
                          className="border-gray-300 focus:border-red-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your requirements"
                        className="border-gray-300 focus:border-red-500 min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-red-500 text-white hover:bg-white hover:text-red-500 border border-transparent hover:border-red-500 transition-colors hover:scale-105"
              >
                Send Business Enquiry
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Our business team will contact you within 24 hours
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
