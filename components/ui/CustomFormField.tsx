'use client'

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Control} from "react-hook-form";
import {FormFieldTypes} from "@/components/Forms/PatientForm";
import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {E164Number} from "libphonenumber-js";

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldTypes,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled? : boolean,
    dateFormat? : string,
    showTimesSelect? : boolean,
    children? : React.ReactNode,
    renderSkeleton? : (field:any) => React.ReactNode
}

const RenderField = ({field,props} : {field : any, props : CustomProps }) => {
    const {name, fieldType, placeholder, iconSrc, iconAlt, disabled, dateFormat, showTimesSelect, children, renderSkeleton} = props;
    switch (props.fieldType) {
        case FormFieldTypes.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || "icon"}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0 bg-transparent"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldTypes.EMAIL:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || "icon"}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0 bg-transparent"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldTypes.PHONE_INPUT:
            return (
                    <FormControl>
                        <PhoneInput
                            defaultCountry={"US"}
                            placeholder={placeholder}
                            international
                            withCountryCallingCode
                            value={field.value as E164Number}
                            onChange={field.onChange}
                            className="input-phone"
                        />
                    </FormControl>
            )
        default:
            break;
    }
}

const CustomFormField = (props: CustomProps) => {
    const {control,fieldType, name, label} = props;
    return (
        <FormField
            control={control}
            name ={name}
            render={({field}) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldTypes.CHECKBOX && label && (
                        <FormLabel>
                            {label}
                        </FormLabel>
                    )}
                    <RenderField field={field} props={props}/>

                    <FormMessage className = "shad-error"></FormMessage>
                </FormItem>
            )}
        />
    )
}

export default CustomFormField