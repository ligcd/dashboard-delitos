import Header from "./Header";
import PageContainer from "./PageContainer";

export default function MainLayout({ children }) {

    return (

        <div className="min-h-screen bg-slate-100">

            <Header />

            <PageContainer>

                {children}

            </PageContainer>

        </div>

    );

}