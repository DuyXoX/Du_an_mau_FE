'use client'
import { apiClient, useGetData } from "@/service/apiServive";
import { memo } from "react";
import { Button } from "react-bootstrap";

const TestAPI = (() => {
    // const test = async () => {
    //     const reponse = await apiClient.get("/users");
    //     console.log('check call api', reponse);
    // };
    const { data, error, isLoading, mutate } = useGetData('/users');
    console.log('check call api', data);

    return <>
        <Button onClick={() => { test() }}>
            Test API
        </Button>
    </>;
});

export default memo(TestAPI);
