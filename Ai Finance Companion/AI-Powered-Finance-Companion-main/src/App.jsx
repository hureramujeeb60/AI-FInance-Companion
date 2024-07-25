import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { runChat } from "./api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Welcome from "./components/Welcome";
import Result from "./components/Result";
import Header from "./components/Header";

const defaultValues = {
  profession: "",
  country: "",
  salary: "",
  currency_type: "",
  age: "",
  marital_status: "",
  goal: "",
  dependence: "",
  tax: "",
  debts: "",
};

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [loading, setLoading] = useState(false);

  const [ans, setAns] = useState("");
  const form = useForm({
    defaultValues,
    mode: "onChange",
  });

  const handleSend = async (data) => {
    try {
      setLoading(true);
      const validateData = {
        profession: data.profession,
        age: Number(data.age),
        country: data.country,
        salary: Number(data.salary),
        currency_type: data.currency_type,
        marital_status: data.marital_status,
        goal: data.goal,
        dependence: Number(data.dependence),
        tax: Number(data.tax),
        debts: Number(data.debts),
      };
      const res = await runChat(validateData);
      setAns(res);
      setShowWelcome(false);
      setShowForm(false);
      setShowResult(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("server down");
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      <Header />
      {showWelcome && (
        <Welcome setShowForm={setShowForm} setShowWelcome={setShowWelcome} />
      )}
      {showResult && (
        <Result
          ans={ans}
          setShowWelcome={setShowWelcome}
          setShowResult={setShowResult}
        />
      )}
      {showForm && (
        <Form {...form}>
          <div className="flex justify-center mb-6">
            <form
              onSubmit={form.handleSubmit(handleSend)}
              className="space-y-4 w-[70vmax] px-8"
            >
              <FormField
                control={form.control}
                name="profession"
                rules={{
                  required: "Please fill this field",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profession</FormLabel>
                    <FormControl>
                      <Input placeholder="Profession" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your current profession
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                rules={{
                  required: "Please fill this field",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type={"number"} placeholder="Age" {...field} />
                    </FormControl>
                    <FormDescription>Enter your age</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                rules={{
                  required: "Please select a country",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pakistan">Pakistan</SelectItem>
                        <SelectItem value="united state">USA</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a country where you live in
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marital_status"
                rules={{
                  required: "Please select your status",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary"
                rules={{
                  required: "Please fill this field",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input type={"number"} placeholder="150000" {...field} />
                    </FormControl>
                    <FormDescription>Enter your current salary per month</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency_type"
                rules={{
                  required: "Please select a currrency type",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rs">rs</SelectItem>
                        <SelectItem value="$">$</SelectItem>
                        <SelectItem value="€">€</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                    <FormDescription>
                      Select in which type of currency you are earning right now
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="debts"
                rules={{
                  required: "Please fill this field",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Debts</FormLabel>
                    <FormControl>
                      <Input type={"number"} placeholder="100$" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the amount you are paying for the debts
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tax"
                rules={{
                  required: "Please fill this field",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taxes</FormLabel>
                    <FormControl>
                      <Input type={"number"} placeholder="10%" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter how many percent you pay for taxes from your salary
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dependence"
                rules={{
                  required: "Please fill this field",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dependence</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        placeholder="4 or 5 etc."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter number of people who depends on you
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goal"
                rules={{
                  required: "Please write your financial goal",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial Goal</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Want to buy a house etc."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {loading ? (
                <Button>Processing.....</Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </form>
          </div>
        </Form>
      )}
    </div>
  );
};

export default App;
