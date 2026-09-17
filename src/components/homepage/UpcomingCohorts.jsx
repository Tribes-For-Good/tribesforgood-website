"use client";
import AnimatedBox from "@/common/animation/AnimatedBox";
import Image from "next/image";
import React from "react";

const campaigns = [
	{
		id: 1,
		title: "Innovative Funds & Empowering Women in Asia",
		description:
			"This campaign aims to raise awareness and promote the adoption of digital payment methods among women in Asia highlighting the transformative impact of a cashless economy and increased digital payment adoption. This project delves into innovative financing mechanisms like blended finance, Development Impact Bonds, and Social Stock Exchange listings.",
		dates: ["10 Oct", "1 Nov", "1 Dec", "5 Jan"],
		image: "/assets/assets/upcoming/innovative.svg", // Replace with actual image paths
	},
	{
		id: 2,
		title: "Magic of Art & Performing Arts in Wellness",
		description:
			"Changemakers will utilize engaging cultural formats like street plays, dance, art forms, and community events to raise awareness around physical and mental health.",
		dates: ["10 Oct", "1 Nov", "1 Dec", "5 Jan"],
		image: "/assets/assets/upcoming/wired.svg", // Replace with actual image paths
	},
	{
		id: 3,
		title: "Gender, Sports & Inclusion",
		description:
			"Explore Sport Inclusion across topics such as Health, Access to Nutrition, Gender Gap in Sports, Sports Journalism and Management and work on solutions.",
		dates: ["10 Oct", "1 Nov", "1 Dec", "5 Jan"],
		image: "/assets/assets/upcoming/gender.svg", // Replace with actual image paths
	},
	{
		id: 4,
		title: "Teen Friendly Health Clinic",
		description:
			"Educate and empower teenagers about the significance of regular appointments with healthcare providers, dentists, and other professionals. Emphasize the proactive approach to health maintenance and the potential benefits of early detection and prevention.",
		dates: ["10 Oct", "1 Nov", "1 Dec", "5 Jan"],
		image: "/assets/assets/upcoming/teen.svg", // Replace with actual image paths
	},
	{
		id: 5,
		title: "The infodemic: Navigating a world of misinformation",
		description:
			"In today's hyperconnected world, false information spreads rapidly through social media platforms like WhatsApp, Instagram, and Twitter, sometimes fueled by influential celebrities. Help everyone stay informed and resilient in the digital age.",
		dates: ["10 Oct", "1 Nov", "1 Dec", "5 Jan"],
		image: "/assets/assets/upcoming/infodemic.svg", // Replace with actual image paths
	},
];

const UpcomingCohorts = ({ open, setOpen }) => {
	return (
		<AnimatedBox className="lg:bg-hero-gradient bg-white px-5 py-10 lg:py-16">
			<h2 className="text-[#1F2937] text-center text-[24px] lg:text-[32px] px-12 font-bold mb-2 lg:mb-5">
				Upcoming Cohorts
			</h2>
			<p className="font-mulish max-w-4xl mx-auto text-muted text-center text-[12px] lg:text-[18px]">
				1 March / 15 March / 1 April / 15 April / 1 May / 15 May / 1 June / 15 June / 1 July / 15 July
			</p>
			<AnimatedBox className="bg-white max-w-md mx-auto lg:hidden my-5 flex items-center  justify-between shadow-custom border p-3 rounded-lg lg:rounded-xl">
				<div className="flex gap-3 lg:gap-5 items-center ">
					<div className="flex bg-gold w-[32px] h-[32px] lg:w-[48px] lg:h-[48px] items-center rounded-md justify-center">
						<Image
							alt=""
							height={10}
							width={10}
							className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px] object-cover"
							src="/assets/assets/program/file.svg"
						/>
					</div>
					<div className="font-mulish">
						<div className="text-[14px] font-medium lg:font-semibold  lg:text-[20px]">
							Programschedule.pdf
						</div>
						<div className="text-[14px] font-light lg:text-[20px] text-muted">
							24.6 MB
						</div>
					</div>
				</div>
				{/* <Image
          alt=""
          height={10}
          width={10}
          className="w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] object-cover"
          src="/assets/assets/program/download.svg"
        /> */}
			</AnimatedBox>
			<AnimatedBox className="flex items-center justify-center">
				<button
					onClick={() => setOpen(true)}
					className="bg-primary  cursor-pointer w-max mx-auto  lg:mt-7 px-4 p-2 hover:opacity-80 text-black font-raleway font-medium border-none  outline-none rounded-md"
				>
					Download
				</button>
			</AnimatedBox>

			<div className="max-w-7xl divide-y divide-gradient1    mx-auto flex flex-col ">
				{campaigns.map((curr, i) => {
					return <Card key={i} program={curr} />;
				})}
			</div>
		</AnimatedBox>
	);
};

export default UpcomingCohorts;

const Card = ({ program }) => {
	return (
		<AnimatedBox className=" flex flex-col lg:flex-row justify-between">
			<div className="flex gap-4 flex-col lg:flex-row items-center w-full  justify-between rounded-xl p-4">
				<div className="flex-1 gap-4 flex-col lg:flex-row items-center   flex lg:gap-10">
					{/* <div className="text-primary flex lg:flex-col text-[14px] lg:text-[16px] font-semibold">
						{program.dates.map((date, i) => (
							<div className="text-nowrap" key={i}>
								{date}/
							</div>
						))}
					</div> */}
					<div className="flex flex-col gap-3 justify-center">
						<h2 className="lg:text-[24px] text-center lg:text-left font-raleway text-[24px]  font-bold ">
							{program.title}
						</h2>
						<p className="text-[16px] text-center lg:text-left font-mulish lg:text-[16px] text-muted ">
							{program.description}
							{/* lorem */}
						</p>
					</div>
				</div>
				<div className="ml-5">
					{/* <div className="w-32 h-32 border-4 border-gold rounded-full "> */}
					<Image
						src={program?.image}
						alt={program.title}
						width={100}
						height={100}
						className="object-cover w-[200px] h-[200px]"
					/>
					{/* </div> */}
				</div>
			</div>
		</AnimatedBox>
	);
};
