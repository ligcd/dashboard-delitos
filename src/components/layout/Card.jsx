export default function Card({ children, className = "" }) {

    return (

        <section
            className={`
                rounded-2xl
                bg-[#FDFFFF]
                p-6
                shadow-sm
                border
                border-slate-200
                ${className}
            `}
        >

            {children}

        </section>

    );

}