import { createContext, useContext, useState } from "react";

const ComparisonContext = createContext();

export function ComparisonProvider({ children }) {

    const [comparisonType, setComparisonType] = useState("previousPeriod");

    return (

        <ComparisonContext.Provider

            value={{

                comparisonType,

                setComparisonType

            }}

        >

            {children}

        </ComparisonContext.Provider>

    );

}

export function useComparison() {

    return useContext(ComparisonContext);

}