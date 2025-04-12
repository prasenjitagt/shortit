import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GenericUserUrlForm from "@/components/generic-user-form";

const GenericShortner = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center p-4 ">

      <Card className=" max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Paste Your Link Here
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* This is the form component */}
          <GenericUserUrlForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default GenericShortner;
