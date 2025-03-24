import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";

interface CardCreatorProps {
  classname: string;
  title: string;
  description: string;
  content: string;
  footer: string;
}

const CardCreator = ({
  classname,
  title,
  description,
  content,
  footer,
}: CardCreatorProps) => {
  return (
    <>
      <Card className={cn(classname)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {content && (
          <CardContent>
            <p>{content}</p>
          </CardContent>
        )}
        {footer && (
          <CardFooter>
            <p>{footer}</p>
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default CardCreator;
