import { Form } from "@nextui-org/react";
import { Autocomplete } from "@nextui-org/react";
import { AutocompleteItem, Button } from "@nextui-org/react";
import { useState } from "react";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const [submitted, setSubmitted] = useState<Record<
    string,
    FormDataEntryValue
  > | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data);
  };

  return (
    <DefaultLayout>
      <div className="flex items-start w-screen h-screen">
        <Form
          className="w-full max-w-xs"
          validationBehavior="native"
          onSubmit={onSubmit}
        >
          <Autocomplete
            label="Favorite animal"
            name="animal"
            placeholder="Select an animal"
            validate={(value) => {
              let key = typeof value === "string" ? value : value.selectedKey;

              if (!key) {
                return "Please select an animal";
              } else if (key === "tree") {
                return "Tree is not an animal";
              }
            }}
          >
            <AutocompleteItem key="cat">Cat</AutocompleteItem>
            <AutocompleteItem key="dog">Dog</AutocompleteItem>
            <AutocompleteItem key="tree">Tree (error)</AutocompleteItem>
            <AutocompleteItem key="tiger">Tiger</AutocompleteItem>
          </Autocomplete>
          <Button color="primary" type="submit">
            Submit
          </Button>
          {submitted && (
            <div className="text-small text-default-500">
              You submitted: <code>{JSON.stringify(submitted)}</code>
            </div>
          )}
        </Form>
      </div>
    </DefaultLayout>
  );
}
