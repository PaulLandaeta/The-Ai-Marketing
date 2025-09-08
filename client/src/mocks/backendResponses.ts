import type { BriefInput, BriefOutput, PostGenerationRequest } from '../api/types';

export interface PostGenerationResponse {
  topic: string;
  audience: string;
  tone: string;
  post: string;
  hashtags: string[];
  image_prompt: string;
  images: string[];
  score: number;
  sources: string[];
  usage: {
    model: string;
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    llm_usd: number;
    image_usd: number;
    total_usd: number;
  };
}

export interface MultiVariationResponse {
  topic: string;
  audience: string;
  tone: string;
  options: PostGenerationResponse[];
}

export const mockBriefResponse: BriefOutput = {
  core_text: "Revoluciona tu productividad académica con TaskMaster AI, la primera aplicación que utiliza inteligencia artificial para optimizar tu tiempo de estudio. Diseñada especialmente para estudiantes universitarios, nuestra plataforma aprende de tus hábitos y crea horarios personalizados que se adaptan a tu ritmo de vida.",
  caption: "🎓 ¿Cansado de sentir que no tienes suficiente tiempo para estudiar? TaskMaster AI está aquí para cambiar eso. Únete a más de 10,000 estudiantes que ya optimizaron su rendimiento académico. Descarga gratis y descubre cómo la IA puede transformar tu experiencia universitaria. #ProductividadAcadémica",
  hashtags: ["#TaskMasterAI", "#ProductividadEstudiantil", "#InteligenciaArtificial", "#EstudiantesUniversitarios", "#GestiónDelTiempo"],
  post_type: "Launch",
  visual_concept: {
    format: "Carousel",
    frames: [
      {
        title: "El Problema",
        shot: "Estudiante abrumado con múltiples tareas y fechas límite"
      },
      {
        title: "La Solución",
        shot: "Interface limpia de TaskMaster AI organizando automáticamente las tareas"
      },
      {
        title: "Los Resultados",
        shot: "Estudiante relajado con tiempo libre después de completar todas sus tareas"
      }
    ],
    palette: ["#0B5FFF", "#0FD28F"],
    typography: "Inter",
    why: "El formato carrusel permite contar una historia completa del problema a la solución, maximizando el engagement en LinkedIn",
    image_url: "https://chatia.app/wp-content/uploads/2024/07/DALL%C2%B7E-2024-07-24-16.42.59-A-3D-cartoon-style-illustration-for-a-blog-article-titled-Ventas-Digitales_-El-Futuro-de-la-Inteligencia-Artificial-en-el-Marketing-Digital.-The-ima.webp"
  },
  facts: [
    {
      type: "trend",
      value: "Interest change +15.3% last 7d",
      source: "Google Trends (US)"
    },
    {
      type: "related",
      value: "Top related: student productivity apps, AI study tools, time management software",
      source: "Google Trends (US)"
    },
    {
      type: "news",
      value: "AI-powered education tools see 200% growth in university adoption",
      source: "TechCrunch via NewsAPI"
    },
    {
      type: "news", 
      value: "Students report 40% better time management with AI-assisted planning tools",
      source: "EdSurge via NewsAPI"
    }
  ],
  reasoning: "Elegimos LinkedIn + carrusel para maximizar alcance B2B.\n• Google Trends (US): Interest change +15.3% last 7d\n• Google Trends (US): Top related: student productivity apps, AI study tools, time management software\n• TechCrunch via NewsAPI: AI-powered education tools see 200% growth in university adoption\n• EdSurge via NewsAPI: Students report 40% better time management with AI-assisted planning tools",
  run_id: "brief_12a4b8c9d2e3f456"
};

export const mockPostResponse: PostGenerationResponse = {
  topic: "Python Course Launch",
  audience: "aspiring developers",
  tone: "enthusiastic",
  post: `🚀 ¡GRAN NOTICIA! Acabamos de lanzar nuestro curso de Python para principiantes más completo del mercado!

¿Quieres dominar la programación pero no sabes por dónde empezar? Este es tu momento.

🎯 Lo que incluye:
✅ Proyectos reales que puedes mostrar en tu portafolio
✅ Mentoría personalizada con desarrolladores senior
✅ Certificación oficial reconocida por la industria
✅ Comunidad exclusiva de estudiantes

⏰ OFERTA ESPECIAL: 40% de descuento hasta el 15 de septiembre

No dejes pasar esta oportunidad de cambiar tu carrera. Los cupos son limitados y ya tenemos más de 500 estudiantes inscritos.

👉 Inscríbete ahora y comienza tu journey como desarrollador Python`,
  hashtags: [
    "#Python",
    "#Programming", 
    "#LearnToCode",
    "#DesarrolloPython",
    "#CursoPython",
    "#ProgramaciónParaPrincipiantes"
  ],
  image_prompt: "Minimal, clean illustration representing: Python Course Launch",
  images: [
    "https://chatia.app/wp-content/uploads/2024/07/DALL%C2%B7E-2024-07-24-16.42.59-A-3D-cartoon-style-illustration-for-a-blog-article-titled-Ventas-Digitales_-El-Futuro-de-la-Inteligencia-Artificial-en-el-Marketing-Digital.-The-ima.webp",
    "https://imagenes.elpais.com/resizer/v2/OWUFHEAIFNAABGRDLVZD7H556A.jpg?auth=98c83f4ed8fa90154e0fe0efcdc6a88f892a9c0487b7b82f02edd86fdd45ca69&width=1960&height=1103&smart=true",
    "https://www.camarabilbao.com/wp-content/uploads/2025/05/marketing-digital-ia.jpeg",
    "https://chatia.app/wp-content/uploads/2024/07/DALL%C2%B7E-2024-07-24-16.42.59-A-3D-cartoon-style-illustration-for-a-blog-article-titled-Ventas-Digitales_-El-Futuro-de-la-Inteligencia-Artificial-en-el-Marketing-Digital.-The-ima.webp"
  ],
  score: 0.0,
  sources: [],
  usage: {
    model: "gpt-4o-mini",
    prompt_tokens: 156,
    completion_tokens: 312,
    total_tokens: 468,
    llm_usd: 0.0109,
    image_usd: 0.1600,
    total_usd: 0.1709
  }
};

export const mockMultiVariationResponse: MultiVariationResponse = {
  topic: "Python Course Launch",
  audience: "aspiring developers", 
  tone: "enthusiastic",
  options: [
    {
      topic: "Python Course Launch",
      audience: "aspiring developers",
      tone: "enthusiastic",
      post: `🚀 ¡GRAN NOTICIA! Acabamos de lanzar nuestro curso de Python para principiantes más completo del mercado!

¿Quieres dominar la programación pero no sabes por dónde empezar? Este es tu momento.

🎯 Lo que incluye:
✅ Proyectos reales que puedes mostrar en tu portafolio
✅ Mentoría personalizada con desarrolladores senior
✅ Certificación oficial reconocida por la industria
✅ Comunidad exclusiva de estudiantes

⏰ OFERTA ESPECIAL: 40% de descuento hasta el 15 de septiembre

👉 Inscríbete ahora y comienza tu journey como desarrollador Python`,
      hashtags: ["#Python", "#Programming", "#LearnToCode"],
      image_prompt: "Minimal, clean illustration representing: Python Course Launch (variation 1)",
      images: ["https://chatia.app/wp-content/uploads/2024/07/DALL%C2%B7E-2024-07-24-16.42.59-A-3D-cartoon-style-illustration-for-a-blog-article-titled-Ventas-Digitales_-El-Futuro-de-la-Inteligencia-Artificial-en-el-Marketing-Digital.-The-ima.webp", "https://imagenes.elpais.com/resizer/v2/OWUFHEAIFNAABGRDLVZD7H556A.jpg?auth=98c83f4ed8fa90154e0fe0efcdc6a88f892a9c0487b7b82f02edd86fdd45ca69&width=1960&height=1103&smart=true", "https://www.camarabilbao.com/wp-content/uploads/2025/05/marketing-digital-ia.jpeg", "https://chatia.app/wp-content/uploads/2024/07/DALL%C2%B7E-2024-07-24-16.42.59-A-3D-cartoon-style-illustration-for-a-blog-article-titled-Ventas-Digitales_-El-Futuro-de-la-Inteligencia-Artificial-en-el-Marketing-Digital.-The-ima.webp"],
      score: 0.0,
      sources: [],
      usage: {
        model: "gpt-4o-mini",
        prompt_tokens: 156,
        completion_tokens: 312,
        total_tokens: 468,
        llm_usd: 0.0109,
        image_usd: 0.1600,
        total_usd: 0.1709
      }
    },
    {
      topic: "Python Course Launch",
      audience: "aspiring developers",
      tone: "enthusiastic", 
      post: `💻 ¿Siempre quisiste aprender Python? ¡Ahora es tu momento!

Python es el lenguaje más demandado del mercado. Empresas como Netflix, Instagram y Spotify lo usan a diario.

🌟 Nuestro nuevo curso incluye:
• 50+ ejercicios prácticos
• Proyectos del mundo real
• Soporte 24/7 de instructores
• Garantía de satisfacción

🔥 Early Bird: 40% OFF (Solo hasta el 15 de septiembre)

¿Listo para dar el salto? Más de 500 estudiantes ya se inscribieron.

💡 No esperes más. Tu futuro como programador empieza hoy.`,
      hashtags: ["#Python", "#Programming", "#LearnToCode"],
      image_prompt: "Minimal, clean illustration representing: Python Course Launch (variation 2)",
      images: ["https://imagenes.elpais.com/resizer/v2/OWUFHEAIFNAABGRDLVZD7H556A.jpg?auth=98c83f4ed8fa90154e0fe0efcdc6a88f892a9c0487b7b82f02edd86fdd45ca69&width=1960&height=1103&smart=true", "https://www.camarabilbao.com/wp-content/uploads/2025/05/marketing-digital-ia.jpeg", "https://chatia.app/wp-content/uploads/2024/07/DALL%C2%B7E-2024-07-24-16.42.59-A-3D-cartoon-style-illustration-for-a-blog-article-titled-Ventas-Digitales_-El-Futuro-de-la-Inteligencia-Artificial-en-el-Marketing-Digital.-The-ima.webp", "https://imagenes.elpais.com/resizer/v2/OWUFHEAIFNAABGRDLVZD7H556A.jpg?auth=98c83f4ed8fa90154e0fe0efcdc6a88f892a9c0487b7b82f02edd86fdd45ca69&width=1960&height=1103&smart=true"],
      score: 0.0,
      sources: [],
      usage: {
        model: "gpt-4o-mini", 
        prompt_tokens: 160,
        completion_tokens: 298,
        total_tokens: 458,
        llm_usd: 0.0103,
        image_usd: 0.1600,
        total_usd: 0.1703
      }
    },
    {
      topic: "Python Course Launch",
      audience: "aspiring developers",
      tone: "enthusiastic",
      post: `🐍 Python está en todas partes: Netflix, Instagram, Spotify, Tesla...

¿Qué tienen en común? Todos usan Python para impulsar sus innovaciones.

🚀 Lanza tu carrera tech con nuestro curso completo:
→ De cero a desarrollador en 12 semanas
→ Proyectos que impresionan a empleadores
→ Mentoría uno-a-uno con seniors
→ Red de contactos en la industria

⚡ Precio especial: $299 → $179 (hasta 15/09)

Ya somos 500+ estudiantes transformando sus vidas.

🎯 Tu momento es AHORA. ¿Te unes a la revolución Python?`,
      hashtags: ["#Python", "#Programming", "#LearnToCode"],
      image_prompt: "Minimal, clean illustration representing: Python Course Launch (variation 3)",
      images: ["https://www.camarabilbao.com/wp-content/uploads/2025/05/marketing-digital-ia.jpeg", "https://chatia.app/wp-content/uploads/2024/07/DALL%C2%B7E-2024-07-24-16.42.59-A-3D-cartoon-style-illustration-for-a-blog-article-titled-Ventas-Digitales_-El-Futuro-de-la-Inteligencia-Artificial-en-el-Marketing-Digital.-The-ima.webp", "https://imagenes.elpais.com/resizer/v2/OWUFHEAIFNAABGRDLVZD7H556A.jpg?auth=98c83f4ed8fa90154e0fe0efcdc6a88f892a9c0487b7b82f02edd86fdd45ca69&width=1960&height=1103&smart=true", "https://www.camarabilbao.com/wp-content/uploads/2025/05/marketing-digital-ia.jpeg"],
      score: 0.0,
      sources: [],
      usage: {
        model: "gpt-4o-mini",
        prompt_tokens: 162,
        completion_tokens: 305,
        total_tokens: 467,
        llm_usd: 0.0107,
        image_usd: 0.1600,
        total_usd: 0.1707
      }
    }
  ]
};

export const mockTechnicalPostResponse: PostGenerationResponse = {
  topic: "PostgreSQL Optimization",
  audience: "backend developers",
  tone: "technical",
  post: `PostgreSQL performance optimization requires a systematic approach to indexing and query planning.

Key strategies for high-traffic applications:

1. Index Strategy
- Use partial indexes for filtered queries
- Consider GIN indexes for full-text search
- Monitor index usage with pg_stat_user_indexes

2. Query Optimization
- Analyze execution plans with EXPLAIN ANALYZE
- Avoid N+1 queries with proper joins
- Use connection pooling (PgBouncer)

3. Configuration Tuning
- shared_buffers: 25% of RAM
- effective_cache_size: 75% of RAM
- work_mem: Adjust per connection

4. Monitoring
- Track slow queries with pg_stat_statements
- Monitor connection counts and locks
- Set up alerts for performance degradation

Implementation requires careful testing in staging environments that mirror production load patterns.

What optimization techniques have worked best in your PostgreSQL deployments?`,
  hashtags: ["#PostgreSQL", "#Database", "#Performance", "#BackendDev", "#SQL"],
  image_prompt: "Minimal, clean illustration representing: PostgreSQL Optimization",
  images: [],
  score: 0.0,
  sources: [],
  usage: {
    model: "gpt-4o-mini",
    prompt_tokens: 145,
    completion_tokens: 287,
    total_tokens: 432,
    llm_usd: 0.0094,
    image_usd: 0.0000,
    total_usd: 0.0094
  }
};

export const mockEducationalPostResponse: PostGenerationResponse = {
  topic: "Marketing Automation for SMBs",
  audience: "small business owners",
  tone: "friendly",
  post: `🚀 Automatización de Marketing para PyMEs: Tu Guía Completa

¿Sientes que no tienes tiempo para marketing? Te entiendo perfectamente.

📋 Herramientas GRATUITAS para empezar:
• Mailchimp: 2,000 contactos gratis
• HubSpot: CRM y email marketing básico
• Canva: Diseños automáticos para redes
• Buffer: Programación de posts

💡 Caso de éxito real:
María (panadería local) automatizó sus emails de cumpleaños y aumentó ventas 35% en 3 meses.

🎯 Pasos para implementar HOY:
1. Lista tus tareas repetitivas de marketing
2. Elige UNA herramienta para empezar
3. Configura tu primer flujo automático
4. Mide resultados semanalmente

⏰ Dedica solo 2 horas este fin de semana y verás la diferencia.

¿Qué tarea de marketing te quita más tiempo? 👇`,
  hashtags: ["#MarketingAutomation", "#SmallBusiness", "#PyMEs", "#Emprendimiento", "#MarketingDigital"],
  image_prompt: "Minimal, clean illustration representing: Marketing Automation for SMBs",
  images: ["https://chatia.app/wp-content/uploads/2024/07/DALL%C2%B7E-2024-07-24-16.42.59-A-3D-cartoon-style-illustration-for-a-blog-article-titled-Ventas-Digitales_-El-Futuro-de-la-Inteligencia-Artificial-en-el-Marketing-Digital.-The-ima.webp", "https://www.camarabilbao.com/wp-content/uploads/2025/05/marketing-digital-ia.jpeg"],
  score: 0.0,
  sources: [],
  usage: {
    model: "gpt-4o-mini",
    prompt_tokens: 189,
    completion_tokens: 324,
    total_tokens: 513,
    llm_usd: 0.0122,
    image_usd: 0.0800,
    total_usd: 0.0922
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function mockGenerateBrief(input: BriefInput): Promise<BriefOutput> {
  const delayTime = Math.random() * 2000 + 2000;
  await delay(delayTime);
  
  const response = { ...mockBriefResponse };
  response.run_id = `brief_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  if (input.platform === 'Instagram') {
    response.caption = response.caption.replace('LinkedIn', 'Instagram');
    response.visual_concept.format = 'Image';
  } else if (input.platform === 'TikTok') {
    response.visual_concept.format = 'Video';
  }
  
  return response;
}

export async function mockGeneratePost(input: PostGenerationRequest): Promise<PostGenerationResponse | MultiVariationResponse> {
  const delayTime = Math.random() * 3000 + 3000;
  await delay(delayTime);
  
  if (input.variations === 1) {
    if (input.template === 'technical') {
      return mockTechnicalPostResponse;
    } else if (input.template === 'storytelling') {
      return mockEducationalPostResponse;
    }
    return mockPostResponse;
  } else {
    return mockMultiVariationResponse;
  }
}
