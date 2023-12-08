import ProductCard from "@/app/components/ProductCard";
import Wrapper from "@/app/components/Wrapper";
import { UseFetchFromNext } from "@/app/utils/api";
// import { useFetchFromNext } from "@/utils/api";
import { baseUrl } from "@/app/utils/baseUrl";

const Category = async ({ category, products, params }) => {

    category = await UseFetchFromNext('/categories/${params.slug}')
    products = category.data;
    return (
        <div className="w-full md:py-20">
            <Wrapper>
                <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                    <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                        {category?.data?.name}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                    {products?.product?.map((item) => {
                        return <ProductCard key={item._id} item={item} />;
                    })}
                    {/* <ProductCard /> */}
                    {/* <ProductCard /> */}
                    {/* <ProductCard /> */}
                </div>
            </Wrapper>
        </div>
    );
};

export default Category;
