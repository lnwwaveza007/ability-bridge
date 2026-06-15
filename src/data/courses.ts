/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LessonContent {
  title: string;
  concept: string;
  example: string;
  audioScript: string; // Used for "read out" voice assistance
}

export interface ActivityOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface CourseModule {
  id: string;
  title: string;
  titleTh: string;
  description: string;
  descriptionTh: string;
  standardContent: LessonContent;
  simpleContent: LessonContent; // Accessible simplified language version
  toolUnlockedId?: string;
  toolUnlockedName?: string;
  toolUnlockedDesc?: string;
  activity: {
    question: string;
    questionTh: string;
    options: ActivityOption[];
  };
}

export const COURSE_MODULES: CourseModule[] = [
  {
    id: "module-1",
    title: "Module 1: What is Marketing?",
    titleTh: "บทที่ 1: การตลาดคืออะไร?",
    description: "Understand how to help people see the real value of what we make or do.",
    descriptionTh: "ทำความเข้าใจวิธีกระตุ้นให้ผู้คนเห็นคุณค่าที่แท้จริงของสินค้าและบริการของเรา",
    standardContent: {
      title: "What is Marketing?",
      concept: "Marketing is not just selling or advertising. It is the art and practice of identifying, building, and communicating the unique value of our services—like 20Rai Cafe—or handmade products directly to the people who need and appreciate them. It allows us to build sustainable relationships with partners without relying on charity.",
      example: "Instead of saying 'Please buy our products to help poor children' (charity-based), marketing says: 'Our wooden phone stands are handmade with smooth, premium local pine, making your desk organised and stylish while showing professional craft.' (value-based)",
      audioScript: "Lesson 1: What is marketing? Marketing means showing the real value of our products or cafe. It helps people understand why our wooden craft is great or why our cafe experience is peaceful and worth visiting, without asking for pity."
    },
    simpleContent: {
      title: "What is Marketing? (Easy Version)",
      concept: "Marketing means helping people know about the good things we make! We do not ask people to buy just because they feel sorry for us. We show them how good our work is.",
      example: "Good marketing tells a customer: 'This phone stand is strong, smooth, and keeps your table tidy!' It does not say: 'Please buy this to help us.'",
      audioScript: "Easy Lesson 1: Marketing is showing why our work is good! We tell people about our beautiful cafe and smooth phone stands. This makes them happy to buy from us."
    },
    toolUnlockedId: "marketing_helper",
    toolUnlockedName: "Marketing Helper + Worth & Price Calculator",
    toolUnlockedDesc: "A simple marketing coach and pricing helper. Learners can choose the product, customer, value, call-to-action, and fair price after finishing this module.",
    activity: {
      question: "Which option represents a professional, value-based marketing message?",
      questionTh: "ข้อความใดแสดงถึงการขายที่มุ่งเน้นคุณค่าและการทำงานระดับมืออาชีพโดยไม่ใช้ความน่าสงสาร?",
      options: [
        {
          id: "m1-opt-1",
          text: "Help feed our trainees by buying these products. They have disabilities and need your support.",
          isCorrect: false,
          explanation: "This uses a pity-based charity approach. It does not focus on product quality or skills."
        },
        {
          id: "m1-opt-2",
          text: "Enjoy our signature dark roast espresso at 20Rai Cafe, brewed in a quiet garden setting. Our staff are trained to deliver high-quality barista coffee.",
          isCorrect: true,
          explanation: "Perfect! This describes high-quality drinks, a pleasant workspace, and professional staff skills."
        }
      ]
    }
  },
  {
    id: "module-2",
    title: "Module 2: Know Your Customer",
    titleTh: "บทที่ 2: รู้จักลูกค้าของเรา",
    description: "Identify different groups of customers and understand what they care about.",
    descriptionTh: "เรียนรู้ที่จะจัดกลุ่มลูกค้าที่แตกต่างกัน และเข้าใจว่าพวกเขามองหาอะไร",
    standardContent: {
      title: "Know Your Customer",
      concept: "Not all customers are the same. A university student wants a budget-friendly workspace with fast Wi-Fi. An office corporate CSR team wants a structured, meaningful workshop package to show social responsibility. Identifying target personas helps us talk to their direct needs.",
      example: "Family groups care about spacious child-friendly tables, and sweet drinks. Cafe-hoppers care about visual aesthetics, photo corners, and interesting unique coffee blends.",
      audioScript: "Lesson 2: Know your customer. Different customers buy for different reasons. Students want Wi-Fi and cheaper drinks. Corporate teams want group workshops. Let us match our story to what they want!"
    },
    simpleContent: {
      title: "Know Your Customer (Easy Version)",
      concept: "People buy things for different reasons. We need to know who our customer is. A student wants a quiet place to read. A group of tourists wants to take nice photos and try drinks.",
      example: "For a student, we say: 'We have free Wi-Fi and quiet tables!' For a family, we say: 'We have big tables and delicious cake!'",
      audioScript: "Easy Lesson 2: Who is our user? A student wants quiet desks. A tourist wants delicious juice and beautiful spots. We must offer what they like."
    },
    toolUnlockedId: "customer_persona",
    toolUnlockedName: "Customer Persona Helper",
    toolUnlockedDesc: "Build detailed templates of what students, cafe hoppers, or corporate CSR managers care about to align your marketing message.",
    activity: {
      question: "If 20Rai Cafe wants to attract a corporate CSR team for a group visit, what should we highlight?",
      questionTh: "หากคาเฟ่ 20Rai ต้องการต้อนรับหน่วยงานมาจัดกิจกรรม CSR บรรษัทบริบาล สิ่งที่เราควรชูคืออะไร?",
      options: [
        {
          id: "m2-opt-1",
          text: "Double shots of espresso for cheap prices on Mondays.",
          isCorrect: false,
          explanation: "Cheap drinks appeal to students, not corporate CSR team building."
        },
        {
          id: "m2-opt-2",
          text: "Hands-on barista workshops and handmade coaster gifts, showing how their visit boosts learner vocational income.",
          isCorrect: true,
          explanation: "Excellent! The CSR teams love educational interaction, team building, and demonstrable social impact."
        }
      ]
    }
  },
  {
    id: "module-3",
    title: "Module 3: Product / Service Value",
    titleTh: "บทที่ 3: สื่อสารคุณค่าคุณประโยชน์",
    description: "Focus on the strengths, utility, and beautiful experiences of your offerings.",
    descriptionTh: "เน้นย้ำจุดเด่น ความมีชีวิตชีวา และประโยชน์ที่แท้จริงของผลงานหรือคาเฟ่ของเรา",
    standardContent: {
      title: "Product / Service Value",
      concept: "A strong Value Proposition explains exactly how our product or service solves a problem or delivers outstanding joy. Focus on raw facts: the durability of timber, the freshness of ingredients, the calming nature of the layout, and how our inclusive cafe crew runs a pristine service environment.",
      example: "Value of 20Rai Cafe Package: Spacious outdoor green garden, highly reliable barista support, disabled-accessible ramps, custom corporate gifts included, and direct supporting social impact.",
      audioScript: "Lesson 3: Product and Service Value. Tell people what makes our work special. Talk about the quality Pine Wood of the stand, or the natural coffee beans. Make quality lead the conversation!"
    },
    simpleContent: {
      title: "Product / Service Value (Easy)",
      concept: "Why should people buy from us? Because our products are very good, strong, and beautiful! We talk about how great our items are.",
      example: "For a wooden stand, we say: 'This is made of strong pine wood. It does not break, and it holds your screen perfectly.'",
      audioScript: "Easy Lesson 3: Why are our goods special? Our wood stand is strong and holds phones safe. Our cafe is clean, green, and beautiful. That is our true value!"
    },
    toolUnlockedId: "value_builder",
    toolUnlockedName: "Value Proposition Builder",
    toolUnlockedDesc: "Define key physical strengths, emotional stories, and social impacts of products and service experience to form strong marketing pillars.",
    activity: {
      question: "What is a good value proposition for our Handmade Wooden Phone Stand?",
      questionTh: "คุณลักษณะใดส่งเสริมคุณค่าที่แข็งแรงให้กับที่วางโทรศัพท์มือถือไม้ทำมือ?",
      options: [
        {
          id: "m3-opt-1",
          text: "It is built with sturdy imported pine, double-sanded for a water-resistant smooth finish, with wide grooves suited for all phone cases.",
          isCorrect: true,
          explanation: "Correct! This outlines specific material quality, physical finish, and functional compatibility."
        },
        {
          id: "m3-opt-2",
          text: "We spent 3 days making this because we lack modern machines, so please buy so we can afford better tools.",
          isCorrect: false,
          explanation: "This highlights inefficiency and uses pity. Real marketing highlights craftsmanship and outstanding quality."
        }
      ]
    }
  },
  {
    id: "module-4",
    title: "Module 4: Storytelling with Dignity",
    titleTh: "บทที่ 4: เล่าเรื่องราวอย่างมีเกียรติ",
    description: "Create respect-based stories rather than calling for symphathy.",
    descriptionTh: "เขียนเรื่องราวตามความจริงที่น่าชื่นชมและความพยายามของผู้เรียน ไม่ใช้ความน่าสงสารเชิงสังคมสงเคราะห์",
    standardContent: {
      title: "Storytelling with Dignity",
      concept: "Dignity-first storytelling highlights the skills, steps, hard training, and ultimate professional triumph of our learners. It shows them as capable creators and valued cafe staff who earn their livelihood through dedication. It rejects tragic descriptions of disability.",
      example: "Instead of saying 'Despite her tragic condition, she struggles to pack', say: 'Suda trained for 3 weeks to master table setting and coaster alignment. Today, she leads the greeting team with infectious energy, ensuring tables are prepped to perfect cafe grids.'",
      audioScript: "Lesson 4: Storytelling with Dignity. We celebrate learning, hard work, and training! We tell stories of how our team practices daily to get coffee recipes perfectly right. This earns respect and loyal customers."
    },
    simpleContent: {
      title: "Storytelling with Dignity (Easy)",
      concept: "We tell stories of our team's hard work, training, and big smiles! We show what we CAN do.",
      example: "Instead of saying 'Lek is sick but tries representation', we say: 'Lek trained hard for 20 days! Now he makes the best strawberry smoothies and greets visitors with joy.'",
      audioScript: "Easy Lesson 4: Let's share our proud skills! We tell how we train every day to serve great coffee. Customers will look at our abilities with big respect!"
    },
    toolUnlockedId: "qr_story",
    toolUnlockedName: "QR Story Builder",
    toolUnlockedDesc: "Generate beautiful, dignifying story narratives that can be linked to physical QR codes on tables or product labels for customers to scan and read on-site.",
    activity: {
      question: "Which story makes customers proud to buy our coaster or visit our cafe?",
      questionTh: "เรื่องราวแบบใดทำให้ผู้บริโภคเกิดความยินดีและภาคภูมิใจที่ได้อุดหนุน?",
      options: [
        {
          id: "m4-opt-1",
          text: "Nid has developmental challenges and has nowhere else to go, so please support her.",
          isCorrect: false,
          explanation: "This is heavy, pity-based charity. It does not show Nid's professional pride."
        },
        {
          id: "m4-opt-2",
          text: "Nid mastered precision lacquer coating over a 30-day apprenticeship. Every coaster she builds is triple-inspected for rich, water-safe wood patterns.",
          isCorrect: true,
          explanation: "Yes! This celebrates Nid's real master craftsmanship, training duration, and meticulous quality standard."
        }
      ]
    }
  },
  {
    id: "module-5",
    title: "Module 5: Caption and Promotion",
    titleTh: "บทที่ 5: พาดหัวและคำเชิญชวน",
    description: "Write warm, short, and effective captions for Facebook, LINE, and signs.",
    descriptionTh: "เรียนรู้วิธีเขียนแคปชันโพสต์เฟซบุ๊ก ข้อความบรอดแคสต์ไลน์ หรือแผ่นป้ายที่สั้นกระชับและดึงดูดใจ",
    standardContent: {
      title: "Caption and Promotion",
      concept: "Captions must be tailored to the channel. A Facebook post needs an emotional hook, line breaks, and emojis. A LINE broadcast should start with an urgent welcoming offer, a short bullet point list, and a highly clear Call-to-Action (CTA). A Poster needs bold clear words.",
      example: "Facebook hook: '🌸 Find your weekend peace at 20Rai Cafe. Our coffee is brewed with local single-origin beans, served by our proud inclusive crew. Request a group package today!'",
      audioScript: "Lesson 5: Caption and Promotion. Make your words clear! Tell people what we offer, where we are, and how they can contact us. Include a simple link for inquiries."
    },
    simpleContent: {
      title: "Caption and Promotion (Easy)",
      concept: "We write short, nice sentences for social media! We tell people: 1. What we have. 2. Why it is nice. 3. How they can order.",
      example: "Facebook post: '🍃 Visit 20Rai Cafe! Great drinks, quiet garden, and friendly baristas. Send us a message to book a student group table!'",
      audioScript: "Easy Lesson 5: Let's write short messages! Tell people our product name, price, and how to buy. Make it simple for them to send us a message!"
    },
    toolUnlockedId: "campaign_kit",
    toolUnlockedName: "Campaign Kit Generator",
    toolUnlockedDesc: "Instantly translate product or cafe service parameters into formatted captions for Facebook, LINE messages, and poster outlines.",
    activity: {
      question: "What is the most critical element of a marketing caption to ensure you get sales?",
      questionTh: "องค์ประกอบที่สำคัญที่สุดในแคปชันเพื่อเปลี่ยนความสนใจของลูกค้าให้เป็นยอดสั่งซื้อคืออะไร?",
      options: [
        {
          id: "m5-opt-1",
          text: "A clear Call-to-Action (CTA) like 'Click here to book / Send FB message to buy' so customers know exactly how to order.",
          isCorrect: true,
          explanation: "Absolutely! Without a clear ordering method, interested customers will just scroll past."
        },
        {
          id: "m5-opt-2",
          text: "A list of all materials used, with 15 different links to research websites.",
          isCorrect: false,
          explanation: "This is confusing. It overwhelms the user. Keep the buying action clear."
        }
      ]
    }
  },
  {
    id: "module-6",
    title: "Module 6: Photo Basics",
    titleTh: "บทที่ 6: พื้นฐานการถ่ายรูปสินค้า",
    description: "Understand the visual shot lists needed to capture cafe products and services professionally.",
    descriptionTh: "เรียนรู้มุมกล้องที่สำคัญ แสงธรรมชาติ และรายการภาพถ่ายที่คาเฟ่หรือสินค้าต้องมี",
    standardContent: {
      title: "Photo Basics",
      concept: "Customers eat with their eyes first and trust is built on clear photography. Use clean white backgrounds or natural light for products. For cafe services, a 'Shot List' ensures consistency: we need a hero shopfront image, a closeup drink, a portrait of staff serving, and a wide shot showing the spacious table settings.",
      example: "Handmade phone stand shot list: 1. Eye-level with a phone on it. 2. Close-up of double-sanded wood grains. 3. Flat-lay showing box packaging.",
      audioScript: "Lesson 6: Photo Basics. A photo tells a thousand words. Clean natural light, clean tables, and sharp pictures build trust. Make a checklist of 5 shots before taking photos!"
    },
    simpleContent: {
      title: "Photo Basics (Easy)",
      concept: "Clear, bright photos make people want to buy! We use sunlight and make sure the background has no trash or mess. We take close-up photos of our nice drinks and products.",
      example: "Take a photo of a cookie under a sunny window, next to a clean cup! Do not take it in a dark room.",
      audioScript: "Easy Lesson 6: Taking nice pictures! Use sunlight. Clean the tables first. Take a close photo of our signature smoothie and our warm smiles."
    },
    toolUnlockedId: "shot_list",
    toolUnlockedName: "Photo Shot List Generator",
    toolUnlockedDesc: "Get an automated Shot List guiding learners on exactly what photos to take of products, coffee brewing, staff smiles, or group workshops.",
    activity: {
      question: "Which practice results in the most trustworthy product photo?",
      questionTh: "การปฏิบัติแบบใดช่วยให้ได้ภาพถ่ายที่มีความน่าเชื่อถือสูง?",
      options: [
        {
          id: "m6-opt-1",
          text: "Download a generic stock image from the internet that looks perfect but does not match our actual coaster or cafe layout.",
          isCorrect: false,
          explanation: "This is misleading. Real photos showing real trainees/cafes look sincere and build long-term trust."
        },
        {
          id: "m6-opt-2",
          text: "Take photos in natural bright sunlight, showing our actual finished phone stand on a clean desk, and add simple descriptive Alt Text.",
          isCorrect: true,
          explanation: "Awesome! Customers appreciate reality and transparency. Sunlight keeps the image bright and highly professional."
        }
      ]
    }
  },
  {
    id: "module-7",
    title: "Module 7: Handling Customer Interest",
    titleTh: "บทที่ 7: การบันทึกและดูแลผู้สนใจ",
    description: "Track real inquiries from Facebook, LINE, and walk-ins so no lead is lost.",
    descriptionTh: "เรียนรู้วิธีติดตามและตอบกลับคุณลูกค้าจากช่องทางเฟซบุ๊ก ไลน์ หรือหน้าร้าน เพื่อเปลี่ยนความสนใจให้เป็นการทำงานของศูนย์",
    standardContent: {
      title: "Handling Customer Interest",
      concept: "Marketing works, which means customers will inquire. If staff doesn't log inquiries, we miss opportunities. Every contact from LINE, Facebook, or Phone should be logged with: customer name, contact channel, requested offering, status, quantity, and follow-up date.",
      example: "A customer messages: 'Can we book a group of 15 university students next Friday?' Staff logs this immediately in the Inquiry Tracker as 'Group Visit Request / Waiting for confirmation' and assigns Lek to prep.",
      audioScript: "Lesson 7: Handling Customer Interest. When someone messages on LINE or Facebook, write it down! Tracking inquiries helps us follow up, confirm bookings, and organize our learner workspace."
    },
    simpleContent: {
      title: "Handling Customer Interest (Easy)",
      concept: "When people write or call to ask about our craft or cafe, we write it down in our checklist! This keeps us organized and helps us say thank you in time.",
      example: "Customer Nid wants to buy 10 packages next Monday. We write down: Customer name Nid, 10 packages, Monday. We check this list daily!",
      audioScript: "Easy Lesson 7: Let's log our inquiries! When a customer calls, save their name, what they want, and when they need it. This makes sure we never forget an order."
    },
    toolUnlockedId: "inquiry_tracker",
    toolUnlockedName: "Customer Inquiry Tracker",
    toolUnlockedDesc: "Review, log, and filter customer requests from FB, LINE, and Phone in one digital board, and directly confirm entries into production orders.",
    activity: {
      question: "Why should we log inquiries immediately rather than relying on memory or chat history?",
      questionTh: "เหตุใดเราจึงควรบันทึกข้อมูลลูกค้าที่สนใจผ่านหน้าต่างจดบันทึกของระบบ แทนการพึ่งพาความจำและความคุ้นเคย?",
      options: [
        {
          id: "m7-opt-1",
          text: "So that other staff members can see the status, we never double-book tables, and we can convert inquiries into real structured learning tasks.",
          isCorrect: true,
          explanation: "Spot-on! A shared board prevents double-booking, ensures professional follow-ups, and empowers the workspace."
        },
        {
          id: "m7-opt-2",
          text: "So we can send spam emails to the buyer 5 times a day until they block us.",
          isCorrect: false,
          explanation: "That will push customers away. Real tracking is for organized service delivery."
        }
      ]
    }
  },
  {
    id: "module-8",
    title: "Module 8: Turning Demand into Work",
    titleTh: "บทที่ 8: เปลี่ยนยอดความต้องการเป็นงานฝึกทักษะ",
    description: "Convert a confirmed client inquiry into structured learner tasks.",
    descriptionTh: "เรียนรู้วิธีแบ่งเค้กงานชิ้นใหญ่ เช่น ยอดสั่งซื้อ 20 ชิ้น หรือกลุ่มเข้าชมคาเฟ่ มาเป็นงานย่อยๆ ให้ผู้เรียนแต่ละคนตามขีดความสามารถ",
    standardContent: {
      title: "Turning Demand into Work",
      concept: "Once an inquiry is 'Confirmed', it shouldn't just be handled by staff alone. In an inclusive center, we break it into specific tasks suitable for different learning profiles. For a Group Visit of 15 people, tasks include: cleaning tables, preparing welcome materials, arranging chairs, brewing starter juices, and packing souvenir gifts.",
      example: "Breaking down a coater order of 20 units: 10 units sanding (Easy), 10 units precision painting (Medium), 20 units labeling (Easy with visual grids), quality check, and final packaging.",
      audioScript: "Lesson 8: Turning Demand into Work. We represent real work! A confirmed order for 20 phone stands gets divided into small training steps like wood-sanding, labeling, and packing. This helps learners build practical abilities step by step."
    },
    simpleContent: {
      title: "Turning Demand into Work (Easy)",
      concept: "When a customer orders something, we make a checklist of smaller jobs! This lets different friends do different tasks, like painting, cleaning, or labeling packaging.",
      example: "If a group wants to visit the cafe, Lek prepares chairs, Nid blends juice, and Suda sweeps the floor. Everyone does a proud job!",
      audioScript: "Easy Lesson 8: Let's break big jobs into small tasks! One friend cleans tables, one friend serves coffee, one friend puts on nice labels. Teamwork makes us proud of the results!"
    },
    toolUnlockedId: "task_breakdown",
    toolUnlockedName: "Task Breakdown Tool",
    toolUnlockedDesc: "Assign specific sub-tasks to learners based on complexity, support guidelines, and track real-time workshop progress.",
    activity: {
      question: "How do we break down a 10-person cafe package reservation into practical training tasks?",
      questionTh: "การแบ่งงานสำหรับกลุ่มเข้าเยี่ยมชมคาเฟ่ 10 คน ออกเป็นงานฝึกทักษะคือข้อใด?",
      options: [
        {
          id: "m8-opt-1",
          text: "Assign one learner to cook everything, run the cashier, wash dishes, and host the CSR group simultaneously by themselves.",
          isCorrect: false,
          explanation: "This is overwhelming, dangerous, and violates reasonable learner pacing and support rules."
        },
        {
          id: "m8-opt-2",
          text: "Create separated clear micro-tasks: 1. Arrange 10 Chairs (Easy difficulty, Low support); 2. Set up Coaster Souvenirs (Easy, Medium support); 3. Lead juice serving (Medium, High support). Assign to specific learners.",
          isCorrect: true,
          explanation: "Perfect! Separated micro-tasks match individual learner support needs and guarantee vocational safety."
        }
      ]
    }
  },
  {
    id: "module-9",
    title: "Module 9: Skill Evidence",
    titleTh: "บทที่ 9: บันทึกหลักฐานทักษะความสามารถ",
    description: "Document work achievements into a professional Skill Passport of the learner.",
    descriptionTh: "เรียนรู้วิธีสรุปทักษะจากการทำงานจริงของผู้เรียนสะสมเป็นแฟ้มผลงาน ดิจิทัล เพื่อความภาคภูมิใจและเตรียมพร้อมรับความร่วมมือจ้างงาน",
    standardContent: {
      title: "Skill Evidence",
      concept: "A digital Skill Passport is a strength-based resume that records real things a learner has done. Instead of a diagnoses, it highlights: list of completed practical tasks, support structures that work, preferred environment grids, and verified work evidence notes with staff approval.",
      example: "Completed Task: 'Sanded 20 Coaster Edges'. Skill Captured: 'Excellent hand-eye coordination, follows visual templates, maintains persistent focus for 40-minute blocks with visual timers.' This proves work readiness to inclusive businesses.",
      audioScript: "Lesson 9: Skill Evidence. Every completed job is a proud medal of practice! Logging evidence notes proves to companies what we can do. It builds confidence and opens doors for inclusive job hiring!"
    },
    simpleContent: {
      title: "Skill Evidence (Easy)",
      concept: "When we finish our jobs, we save it as a badge! Staff writes down our wonderful skills. This badge proves to cafes and companies that we can do great work.",
      example: "Lek completed 15 table setups. Staff records Lek's badge: 'Ready to welcome visitors, keeps tables clean, very friendly!'",
      audioScript: "Easy Lesson 9: Saving our skill badges! Every clean table or nice package is a badge. These show everyone we are ready and capable creators!"
    },
    toolUnlockedId: "skill_passport",
    toolUnlockedName: "Skill Passport Export",
    toolUnlockedDesc: "Consolidate course progress, unlocked tools, completed workshop tasks, and staff evidence reports into a strength-based PDF portfolio.",
    activity: {
      question: "Which of the following describes a strength-based, dignity-first skill passport entry?",
      questionTh: "ข้อความสะสมหลักฐานทักษะแบบใดแสดงถึงความสามารถและการฝึกฝนอย่างมีความเคารพ?",
      options: [
        {
          id: "m9-opt-1",
          text: "Can carry out wood-sanding, can sand 15 units of phone stands to template touch. Excellent task focus, works best using clear visual charts. Completed 12 tasks with Low Support.",
          isCorrect: true,
          explanation: "Excellent! It lists concrete vocational skills, output metrics, environmental preferences, and support levels."
        },
        {
          id: "m9-opt-2",
          text: "Nid has physical restrictions and cannot do heavy things, but we appreciate her trying.",
          isCorrect: false,
          explanation: "This describes nid from a deficit-first charity viewpoint, offering no concrete proof of professional skill."
        }
      ]
    }
  },
  {
    id: "module-10",
    title: "Module 10: Basic AI Using",
    titleTh: "บทที่ 10: พื้นฐานการงานใช้ปัญญาประดิษฐ์ (AI)",
    description: "Learn how to use AI tools like ChatGPT, Gemini, and Claude to assist in creative writing, checklists, and daily problem-solving.",
    descriptionTh: "เรียนรู้วิธีการทำงานร่วมกับ AI เช่น ChatGPT, Gemini และ Claude เพื่อเขียนหัวข้อโฆษณา จัดวางตาราง และสร้างไอเดียงานฝีมือ",
    standardContent: {
      title: "Basic AI Using",
      concept: "Generative AI tools (such as ChatGPT, Gemini, and Claude) are powerful personal co-pilots. By writing brief, clear directives called 'prompts', you can immediately draft customer emails, refine caption spelling, translate story pitches, or generate step-by-step vocational guides dynamically. They assist you to expand your capability with robust independent support.",
      example: "Typing a prompt like: 'Give me 3 friendly headlines for a cold brew herbal beverage sold at an inclusive cafe.' AI will reply instantly with ready-made ideas including helpful emojis!",
      audioScript: "Lesson 10: Basic AI Using. Creative AI tools are like friendly, smart partners. Talk to them in simple words to write posts, translate languages, or build checklists. You don't have to start from scratch."
    },
    simpleContent: {
      title: "Basic AI Using (Easy Version)",
      concept: "AI is a fast computer friend! You can type simple questions to tools like ChatGPT, Gemini, and Claude. They can write nice messages, check spelling, and help you find new ideas.",
      example: "Ask your AI friend: 'Write a friendly post to invite customers to try our ice tea!' It will give you a bright, happy message with smiles instantly!",
      audioScript: "Easy Lesson 10: Working with your AI friend! ChatGPT, Gemini, and Claude can write nice social posts, fix spelling, or find good craft ideas. Just ask in simple words!"
    },
    toolUnlockedId: "ai_helper",
    toolUnlockedName: "Basic AI Using Assistant",
    toolUnlockedDesc: "Interactive prompt playbook loaded with simple formula cards to instruct ChatGPT, Gemini, and Claude without typing complex words.",
    activity: {
      question: "What is the best way to get a useful response from tools like ChatGPT, Gemini, and Claude?",
      questionTh: "วิธีการพิมพ์ถามเพื่อสร้างคำตอบที่ดีและเป็นประโยชน์ที่สุดจาก ChatGPT, Gemini และ Claude คืออะไร?",
      options: [
        {
          id: "m10-opt-1",
          text: "Give a direct, clear prompt explaining who you are, what you are trying to write, and the look/tone you want.",
          isCorrect: true,
          explanation: "Correct! Simple clarity about who you are, what you need, and your target audience helps the AI craft the absolute best text."
        },
        {
          id: "m10-opt-2",
          text: "Type only a single random word like 'juice' and hope the computer guesses your whole business structure.",
          isCorrect: false,
          explanation: "This is vague. AI needs context to write a highly useful, custom post or reply!"
        }
      ]
    }
  }
];
