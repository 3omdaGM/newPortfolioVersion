export const profile = {
  name: "Mohamed El-Taher",
  role: "Aspiring .NET Backend Developer",
  location: "Cairo, Egypt",
  introduction:
    "Computer Science student focused on building maintainable APIs and database-driven applications with C# and ASP.NET Core.",
  portrait: "/assets/portrait-cutout.png",
  links: {
    github: "https://github.com/3omdaGM",
    linkedin: "https://linkedin.com/in/mohamed-eltaher-dev/",
  },
  expertise: [
    {
      title: "Backend foundations",
      skills: ["C#", "ASP.NET Core Web API", "REST APIs", "JWT authentication"],
    },
    {
      title: "Data & architecture",
      skills: ["EF Core", "SQL Server", "Clean Architecture", "CQRS / MediatR"],
    },
    { title: "Development workflow", skills: ["Git", "GitHub"] },
  ],
  projects: [
    {
      id: "veloura",
      number: "01",
      title: "Veloura",
      category: "TEAM PROJECT / E-COMMERCE BACKEND",
      description:
        "A team e-commerce backend built around clear boundaries and maintainable APIs.",
      contribution:
        "My contributions included authentication and account features, discount management, and Cloudinary product-image handling.",
      tech: [
        "ASP.NET Core",
        "EF Core",
        "SQL Server",
        "Clean Architecture",
        "CQRS / MediatR",
        "JWT",
      ],
      url: "https://github.com/rehamhamdi/Veloura",
      artLabel: "Concept study — backend architecture",
    },
    {
      id: "university",
      number: "02",
      title: "University Website",
      category: "TRAINING PROJECT / RESPONSIVE WEB",
      description:
        "A responsive university website developed during training, connecting structured content with a considered web experience.",
      contribution: "Built using PHP, HTML, CSS, Bootstrap, and JavaScript.",
      tech: ["PHP", "HTML", "CSS", "Bootstrap", "JavaScript"],
      url: "https://github.com/3omdaGM/university-website",
      artLabel: "Concept study — digital campus",
    },
    {
      id: "portfolio",
      number: "03",
      title: "Personal Developer Portfolio",
      category: "PERSONAL PROJECT / FRONTEND",
      description:
        "A home for my projects, technical interests, and development journey.",
      contribution:
        "A frontend project using HTML, CSS, JavaScript, and Bootstrap.",
      tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      url: "https://github.com/3omdaGM/portfolio",
      artLabel: "Concept study — personal identity",
    },
  ],
};
