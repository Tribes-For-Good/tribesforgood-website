"use client";
import AnimatedBox from "@/common/animation/AnimatedBox";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getCategories, getTags, toTitleCase } from "../../util";
import Image from "next/image";
import Footer from "@/components/homepage/Footer";
import Loader from "@/components/Loader";

const contentData = {
  title: "Blogs",
  description:
    "Dive deep into the world of TFG, where our changemakers are solving critical societal challenges",
};

const ViewBlogs = ({ params }) => {
  const { slug } = React.use(params);
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [tags, setTags] = useState(null);
  const [cats, setCats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(
        `https://wp.tribesforgood.com/wp-json/wp/v2/posts?slug=${slug}`,
      );
      setPost(response?.data[0]);

      const imageResponse = await axios(
        `https://wp.tribesforgood.com/wp-json/wp/v2/media/${response?.data[0]?.featured_media}`,
      );
      setImageUrl(imageResponse?.data?.source_url);

      const tags = await getTags(response?.data[0]?.tags);
      setTags(tags);
      const categories = await getCategories(response?.data[0]?.categories);
      setCats(categories);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogData();
  }, [slug]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="overflow-hidden relative flex flex-col  items-center justify-center">
      <Navbar />
      <div className="w-full">
        <div className="relative w-full min-h-[200px] justify-center lg:min-h-[400px]  flex items-center bg-[url('/assets/assets/background.svg')]  bg-cover bg-center overflow-hidden">
          {/* <Image width={10} height={10} alt="" src="/assets/assets/background.svg" className="border w-full object-cover" /> */}
          <div className="max-w-md  lg:max-w-3xl py-16 pt-20 flex flex-col gap-2 w-full lg:gap-5 items-center justify-center">
            <AnimatedBox>
              <h1 className="font-extrabold  text-[20px] lg:text-[48px] font-raleway">
                {contentData?.title}
              </h1>
            </AnimatedBox>
            <AnimatedBox>
              <p className="font-mulish  w-full   px-10 text-center text-muted text-[14px] lg:text-[20px]">
                {contentData?.description}
              </p>
            </AnimatedBox>
          </div>
        </div>
      </div>

      <div className="max-w-6xl p-5 mx-auto py-10 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-[16px] lg:gap-[60px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              width={500}
              height={500}
              alt=""
              className="lg:w-[420px] w-[288px] h-[354px] rounded-lg lg:h-[490px] mx-auto object-cover"
            />
          ) : (
            <div className="w-[420px] rounded-lg h-[490px] bg-muted"></div>
          )}
          <div className="flex flex-col gap-[24px]">
            <div
              className="lg:text-[32px] text-[16px] lg:leading-[48px] text-wide font-raleway font-bold text-[#1F2937]"
              dangerouslySetInnerHTML={{ __html: post?.title?.rendered }}
            />
            <div
              className="lg:text-[20px] text-[16px] font-raleway font-medium lg:leading-[30px] text-muted"
              dangerouslySetInnerHTML={{ __html: post?.excerpt?.rendered }}
            />
          </div>
        </div>

        {/* {tags?.map((curr, i) => {
          return <div key={i}>{curr?.name}</div>;
          })} */}
      </div>
      <div
        className="text-muted max-w-6xl mx-auto p-5 font-mulish flex flex-col gap-5 lg:text-[20px] text-[14px]"
        dangerouslySetInnerHTML={{ __html: post?.content?.rendered }}
      />
      <div className="flex max-w-6xl mx-auto px-5 lg:gap-2 gap-1   justify-start mt-5 flex-wrap py-4 pb-6 w-full  ">
        {tags?.map((button, i) => {
          return (
            <div
              key={i}
              //   onClick={() => setSelectedOption(button?.key)}
              className={`bg-white  p-2 rounded-full shadow-btn-shadow border text-[#1f2937] text-[12px] lg:text-[20px] px-2 font-raleway  cursor-pointer text-nowrap  w-max`}
            >
              {toTitleCase(button?.name)}
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default ViewBlogs;
