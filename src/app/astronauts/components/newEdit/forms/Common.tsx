import React from 'react'

import { superpowersEnum } from 'src/enums'

import {
    Input,
    Error,
    Select
} from '@ordelogy/ordelogy-fe-lib'


interface Props {
    form: string,
    error: any
}

const CommonForm: React.FC<Props> = React.memo(({
    form,
    error
}) => {

    const superpowerOptions = Object.keys(superpowersEnum).map((superpower) => (
        {
            label: superpower,
            value: superpower
        }
    ))

    return (
        <>
            <div className="m-b-2">
                <Input
                    type="text"
                    form={form}
                    name="name"
                    label="Name"
                    className={`${error?.data?.errors?.name ? "danger" : "normal"}`}
                />
                {
                    error?.data?.errors?.name &&
                    <div className="m-t-1">
                        <Error error={error.data.errors.name} />
                    </div>
                }
            </div>
            <div className="m-b-2">
                <Input
                    type="text"
                    form={form}
                    name="surname"
                    label="Surname"
                    className={`${error?.data?.errors?.surname ? "danger" : "normal"}`}
                />
                {
                    error?.data?.errors?.surname &&
                    <div className="m-t-1">
                        <Error error={error.data.errors.surname} />
                    </div>
                }
            </div>
            <div className="m-b-2">
                <Input
                    type="date"
                    form={form}
                    name="birthdate"
                    label="Birthdate"
                    className={`${error?.data?.errors?.birthdate ? "danger" : "normal"}`}
                />
                {
                    error?.data?.errors?.birthdate &&
                    <div className="m-t-1">
                        <Error error={error.data.errors.birthdate} />
                    </div>
                }
            </div>
            <div className="m-b-2">
                <Select
                    form={form}
                    name="superpower"
                    options={superpowerOptions}
                    label="Superpower"
                    className={`${error?.data?.errors?.superpower ? "danger" : "normal"}`}
                    isSearchable
                />
                {
                    error?.data?.errors?.superpower &&
                    <div className="m-t-1">
                        <Error error={error.data.errors.superpower} />
                    </div>
                }
            </div>
        </>
    )
}, (prevProps, nextProps) => {
    if (prevProps.error !== nextProps.error) return false
    return true
})


export default CommonForm