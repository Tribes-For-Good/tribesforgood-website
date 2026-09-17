"use client";
import AnimatedBox from "@/common/animation/AnimatedBox";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Card = ({
  title,
  index,
  featured_media,
  uagb_excerpt,
  yoast_head_json,
  id,
  slug,
}) => {
  const router = useRouter();
  const handleRedirect = (key) => {
    // Replace with your desired key
    router.push(`/blogs/view/${slug}`);
  };

  const [url, setUrl] = useState(null);
  useEffect(() => {
    const fetchMedia = async () => {
      const response = await fetch(
        `https://wp.tribesforgood.com/wp-json/wp/v2/media/${featured_media}`
      );

      // Parse the JSON response to get image data
      const mediaData = await response.json();
      setUrl(mediaData?.source_url);
    };
    fetchMedia();
  }, []);
  return (
    <AnimatedBox className={`${index === 0 ? "hidden lg:block" : ""}`}>
      {/* Card layout with consistent height and flex positioning */}
      <section id="high-school" className="h-full">
        <div className="flex flex-col  justify-between bg-white rounded-lg shadow-md overflow-hidden  max-w-sm h-full mx-auto ">
          {/* Image with animation */}
          {url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-3"
            >
              <Image
                src={url}
                alt={title}
                width={400}
                height={200}
                unoptimized
                className="w-full h-72 rounded-md object-cover"
              />
            </motion.div>
          )}

          {/* Content area with flex positioning to push button to the bottom */}
          <div className="flex flex-col items-start justify-between p-4 flex-grow">
            {/* Title animation */}
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl text-[16px] font-raleway lg:text-[24px] text-[#1F2937] font-semibold mb-2"
              dangerouslySetInnerHTML={{ __html: title?.rendered }}
            />
            {/* {title?.rendered}
            </motion.h3> */}

            {/* Description animation */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-muted font-mulish text-[12px] lg:text-[16px] text-left  mb-4 flex-grow"
              dangerouslySetInnerHTML={{ __html: uagb_excerpt }}
            />
            {/* {uagb_excerpt}
            </motion.p> */}

            {/* Button animation */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-auto font-raleway bg-primary text-[#1F2937] w-max py-2 px-4 rounded-md font-medium text-[16px] lg:text-[18px] hover:bg-opacity-80"
              onClick={() => handleRedirect()}
            >
              View more
            </motion.button>
          </div>
        </div>
      </section>
    </AnimatedBox>
  );
};

export default Card;
