import React, { useEffect } from 'react'

import { useHistory, useLocation } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import store from 'store/index'
import { initForm, getForm } from '@ordelogy/ordelogy-fe-lib'

import { superpowersEnum } from 'src/enums'

import {
    SearchFilter,
    Dropdown,
    Select,
    Button,
    PageLimiter
} from '@ordelogy/ordelogy-fe-lib'


const AstronautsFilter: React.FC = React.memo(() => {

    const form = "astronauts_filters"

    const history = useHistory()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const params = Object.fromEntries(searchParams)
    const superpowerFilter = params["superpower"] ? params["superpower"] : ""

    const dispatch: any = useDispatch()

    const superpowerOptions = Object.keys(superpowersEnum).map((superpower) => (
        {
            label: superpower,
            value: superpower
        }
    ))

    const filters = {
        superpower: superpowerFilter,
    }

    useEffect(() => {
        dispatch(initForm(form, filters))
    }, [location])

    const handleFiltering = () => {
        delete params.superpower

        const _form = getForm(store, form)

        if (_form.superpower) params.superpower = _form.superpower

        const newParams = new URLSearchParams(params)

        history.push({
            search: `?${newParams.toString()}`
        })
    }

    const removeFilters = () => {
        delete params.superpower

        const newParams = new URLSearchParams(params)

        history.push({
            search: `?${newParams.toString()}`
        })
    }


    return (
        <div className="flex-db flex-btb">
            <div className="flexer-db flexer-btb m-r-4-db m-r-4-btb m-b-4-stb m-b-4-mb">
                <SearchFilter
                    name="surname"
                    placeholder="Surname"
                />
            </div>
            <div className="flexer-db flexer-btb m-b-4-stb m-b-4-mb">
                <Dropdown headerClassName="rounded" header="Filters">
                    <div className="p-3">
                        <div className="m-b-2">
                            <Select
                                form={form}
                                name="superpower"
                                options={superpowerOptions}
                                label="Superpower"
                                className="normal"
                                isClearable
                                isSearchable
                            />
                        </div>
                        <div className="flex">
                            <div className="flexer" />
                            {
                                Object.values(filters).some(filter => (filter !== null && filter !== "")) &&
                                <div className="m-r-2">
                                    <Button className="small secondary neutral" onClick={removeFilters}>
                                        <span>
                                            Remove filters
                                        </span>
                                    </Button>
                                </div>
                            }
                            <div>
                                <Button className="small primary neutral" onClick={handleFiltering}>
                                    <span>
                                        Filter
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dropdown>
            </div>
            <div className="flexer-db flexer-btb" />
            <div className="flexer-db flex justify-content-end">
                <div>
                    <PageLimiter
                        title="Astronauts on page"
                        limits={[5, 10, 20]}
                    />
                </div>
            </div>
        </div>
    )
}, (prevProps, nextProps) => (true))

export default AstronautsFilter