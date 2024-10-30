import { apiClient } from "@/service/apiServive";
import { memo } from "react";
import { Button } from "react-bootstrap";

const Test = (() => {
    const test = async () => {
        await apiClient.get("/api/users");
        console.log('check call api');

    }

    return <>
        <Button onClick={test()}>
            Test API
        </Button>
    </>;
});

export default memo(Test);
