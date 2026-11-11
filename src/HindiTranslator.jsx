import { useEffect } from "react";

const translations = {
  "Your collection overview": "आपके संग्रह का विवरण",
  "Your business at a glance": "आपके व्यवसाय की झलक",
  "Welcome, Collector.": "आपका स्वागत है, संग्रहकर्ता।",
  "Welcome, Collector": "आपका स्वागत है, संग्रहकर्ता",
  "Collector": "संग्रहकर्ता",
  "Collection partner": "संग्रह सहयोगी",
  "English": "हिन्दी",
  "SMART SCRAP MANAGEMENT": "स्मार्ट कबाड़ प्रबंधन",
  "KABADIWALA CONNECT / COLLECTOR": "कबाड़ीवाला कनेक्ट / संग्रहकर्ता",
  "WORKSPACE": "कार्य क्षेत्र",
  "Dashboard": "डैशबोर्ड",
  "My dashboard": "मेरा डैशबोर्ड",
  "Sell scrap": "कबाड़ बेचें",
  "Sell scraps": "कबाड़ बेचें",
  "My ledger": "मेरा बिक्री रिकॉर्ड",
  "Ledger": "बिक्री रिकॉर्ड",
  "My profile": "मेरी प्रोफ़ाइल",
  "Admin": "व्यवस्थापक",
  "Analytics": "व्यापार विश्लेषण",
  "Material Prices": "सामग्री की कीमतें",
  "Your profile": "आपकी प्रोफ़ाइल",
  "Your sales ledger": "आपका बिक्री रिकॉर्ड",
  "Record a scrap sale": "कबाड़ की बिक्री दर्ज करें",
  "Record a sale": "बिक्री दर्ज करें",
  "Record your first sale": "अपनी पहली बिक्री दर्ज करें",
  "NEW TRANSACTION": "नया लेन-देन",
  "YOUR RECORD BOOK": "आपकी लेन-देन पुस्तिका",
  "ACCOUNT DETAILS": "खाते की जानकारी",
  "Your collection overview": "आपके संग्रह का विवरण",
  "Transaction ledger": "लेन-देन का रिकॉर्ड",
  "All entries are transactions recorded in this app.": "यहाँ इस ऐप में दर्ज किए गए सभी लेन-देन दिखाई देते हैं।",
  "Enter the details of the material you've actually collected and sold.": "आपने जो सामग्री वास्तव में इकट्ठा करके बेची है, उसका विवरण भरें।",
  "Keep your collection records accurate and up to date.": "अपने संग्रह का रिकॉर्ड सही और अपडेट रखें।",
  "Keep your contact and collection location details up to date.": "अपनी संपर्क जानकारी और संग्रह स्थान को अपडेट रखें।",
  "Material": "सामग्री",
  "Newspaper": "अखबार",
  "Cardboard": "गत्ता",
  "Iron": "लोहा",
  "Steel": "स्टील",
  "Aluminium": "एल्युमिनियम",
  "Copper": "तांबा",
  "Plastic": "प्लास्टिक",
  "Brass": "पीतल",
  "E-waste": "ई-कचरा",
  "Other": "अन्य",
  "Sale date": "बिक्री की तारीख",
  "Quantity (kg)": "मात्रा (किलो)",
  "Quantity": "मात्रा",
  "Price per kg (₹)": "प्रति किलो कीमत (₹)",
  "Rate / kg": "दर / किलो",
  "Buyer name": "खरीदार का नाम",
  "Buyer": "खरीदार",
  "Payment status": "भुगतान की स्थिति",
  "Payment": "भुगतान",
  "Paid": "भुगतान हो गया",
  "Pending": "भुगतान बाकी",
  "Partially paid": "आंशिक भुगतान",
  "Notes (optional)": "टिप्पणी (वैकल्पिक)",
  "Estimated transaction value": "अनुमानित बिक्री राशि",
  "Estimated transaction value": "अनुमानित लेन-देन राशि",
  "Calculated from quantity × price per kg.": "मात्रा × प्रति किलो कीमत के आधार पर गणना।",
  "Save sale to ledger": "बिक्री रिकॉर्ड में सेव करें",
  "Save sale to ledger →": "बिक्री रिकॉर्ड में सेव करें →",
  "Every entry counts.": "हर प्रविष्टि महत्वपूर्ण है।",
  "Your sale will immediately update your ledger, dashboard and analytics. Only the information you enter is recorded.": "आपकी बिक्री दर्ज होते ही रिकॉर्ड, डैशबोर्ड और विश्लेषण अपडेट हो जाएंगे। केवल आपके द्वारा दी गई जानकारी ही दर्ज होगी।",
  "Current location": "वर्तमान स्थान",
  "Edit profile location →": "प्रोफ़ाइल में स्थान बदलें →",
  "Full name": "पूरा नाम",
  "Phone number": "मोबाइल नंबर",
  "State": "राज्य",
  "City": "शहर",
  "Select city": "शहर चुनें",
  "Changes save automatically on this device.": "बदलाव इस डिवाइस पर अपने आप सेव हो जाते हैं।",
  "Saved locally": "इस डिवाइस पर सेव है",
  "Total sales revenue": "कुल बिक्री राशि",
  "Total collected": "कुल एकत्रित मात्रा",
  "Across selected records": "चुने गए रिकॉर्ड के अनुसार",
  "Average price / kg": "औसत कीमत / किलो",
  "Weighted average rate": "भारित औसत दर",
  "Payments pending": "बकाया भुगतान",
  "unpaid / partial": "बिना भुगतान / आंशिक भुगतान",
  "PERFORMANCE": "प्रदर्शन",
  "Sales over time": "समय के अनुसार बिक्री",
  "Based only on transactions you have recorded.": "यहाँ केवल आपके द्वारा दर्ज किए गए लेन-देन दिखाए गए हैं।",
  "REAL ENTRIES": "वास्तविक प्रविष्टियाँ",
  "Monthly revenue": "मासिक बिक्री राशि",
  "Last 6 months · INR": "पिछले 6 महीने · रुपये",
  "Monthly quantity": "मासिक मात्रा",
  "Last 6 months · kg": "पिछले 6 महीने · किलो",
  "MATERIAL MIX": "सामग्री का विवरण",
  "What you collect": "आप क्या एकत्र करते हैं",
  "GROWTH": "व्यापार में वृद्धि",
  "Business progress": "व्यवसाय की प्रगति",
  "Month on month": "पिछले महीने की तुलना में",
  "Year on year": "पिछले वर्ष की तुलना में",
  "Not enough comparison data": "तुलना के लिए पर्याप्त जानकारी नहीं है",
  "Growth compares recorded revenue for the current calendar period with the previous period. A comparison appears once previous-period sales exist.": "वृद्धि की गणना वर्तमान अवधि की दर्ज बिक्री की पिछली अवधि से तुलना करके की जाती है। पिछली अवधि की बिक्री दर्ज होने पर तुलना दिखाई देगी।",
  "LATEST ACTIVITY": "हाल की गतिविधियाँ",
  "Recent transactions": "हाल के लेन-देन",
  "View ledger →": "पूरा बिक्री रिकॉर्ड देखें →",
  "Date": "तारीख",
  "Total": "कुल राशि",
  "Month": "महीना",
  "From": "से",
  "To": "तक",
  "Clear filters": "फ़िल्टर हटाएँ",
  "Export CSV": "CSV डाउनलोड करें",
  "↓ Export CSV": "↓ CSV डाउनलोड करें",
  "No sales recorded yet": "अभी तक कोई बिक्री दर्ज नहीं हुई है",
  "No matching transactions": "कोई मिलते-जुलते लेन-देन नहीं मिले",
  "Your real transactions will appear here after you record your first sale.": "आपकी पहली बिक्री दर्ज करने के बाद आपके वास्तविक लेन-देन यहाँ दिखाई देंगे।",
  "Try changing your date filters, or record a new sale.": "तारीख के फ़िल्टर बदलें या नई बिक्री दर्ज करें।",
  "transaction": "लेन-देन",
  "transactions": "लेन-देन",
  "total value": "कुल राशि",
  "collected": "एकत्रित मात्रा",
  "Save": "सेव करें",
  "Cancel": "रद्द करें",
  "Search": "खोजें",
  "Filter": "फ़िल्टर",
  "Logout": "लॉग आउट",
  "January": "जनवरी",
  "February": "फ़रवरी",
  "March": "मार्च",
  "April": "अप्रैल",
  "May": "मई",
  "June": "जून",
  "July": "जुलाई",
  "August": "अगस्त",
  "September": "सितंबर",
  "October": "अक्टूबर",
  "November": "नवंबर",
  "December": "दिसंबर",
  "Jan": "जनवरी",
  "Feb": "फ़रवरी",
  "Mar": "मार्च",
  "Apr": "अप्रैल",
  "Jun": "जून",
  "Jul": "जुलाई",
  "Aug": "अगस्त",
  "Sep": "सितंबर",
  "Sept": "सितंबर",
  "Oct": "अक्टूबर",
  "Nov": "नवंबर",
  "Dec": "दिसंबर",
  "Andaman and Nicobar Islands": "अंडमान और निकोबार द्वीपसमूह",
  "Andhra Pradesh": "आंध्र प्रदेश",
  "Arunachal Pradesh": "अरुणाचल प्रदेश",
  "Assam": "असम",
  "Bihar": "बिहार",
  "Chandigarh": "चंडीगढ़",
  "Chhattisgarh": "छत्तीसगढ़",
  "Dadra and Nagar Haveli and Daman and Diu": "दादरा और नगर हवेली तथा दमन और दीव",
  "Delhi": "दिल्ली",
  "Goa": "गोवा",
  "Gujarat": "गुजरात",
  "Haryana": "हरियाणा",
  "Himachal Pradesh": "हिमाचल प्रदेश",
  "Jammu and Kashmir": "जम्मू और कश्मीर",
  "Jharkhand": "झारखंड",
  "Karnataka": "कर्नाटक",
  "Kerala": "केरल",
  "Ladakh": "लद्दाख",
  "Lakshadweep": "लक्षद्वीप",
  "Madhya Pradesh": "मध्य प्रदेश",
  "Maharashtra": "महाराष्ट्र",
  "Manipur": "मणिपुर",
  "Meghalaya": "मेघालय",
  "Mizoram": "मिज़ोरम",
  "Nagaland": "नागालैंड",
  "Odisha": "ओडिशा",
  "Puducherry": "पुडुचेरी",
  "Punjab": "पंजाब",
  "Rajasthan": "राजस्थान",
  "Sikkim": "सिक्किम",
  "Tamil Nadu": "तमिलनाडु",
  "Telangana": "तेलंगाना",
  "Tripura": "त्रिपुरा",
  "Uttar Pradesh": "उत्तर प्रदेश",
  "Uttarakhand": "उत्तराखंड",
  "West Bengal": "पश्चिम बंगाल",
  "Lucknow": "लखनऊ",
  "Kanpur": "कानपुर",
  "Noida": "नोएडा",
  "Ghaziabad": "गाज़ियाबाद",
  "Agra": "आगरा",
  "Varanasi": "वाराणसी",
  "Prayagraj": "प्रयागराज",
  "Gorakhpur": "गोरखपुर",
  "Bareilly": "बरेली",
  "Meerut": "मेरठ",
  "kg": "किलो",
  "Built for a cleaner, more connected tomorrow": "स्वच्छ और बेहतर कल के लिए बनाया गया",
  "Kabadiwala Connect": "कबाड़ीवाला कनेक्ट"
};

const entries = Object.entries(translations)
  .sort((a, b) => b[0].length - a[0].length);

function translateText(value) {
  let result = value;
  for (const [english, hindi] of entries) {
    result = result.split(english).join(hindi);
  }
  return result;
}

function translateNode(root) {
  if (!root) return;

  if (root.nodeType === Node.TEXT_NODE) {
    const oldText = root.nodeValue;
    if (oldText && oldText.trim()) {
      const newText = translateText(oldText);
      if (newText !== oldText) root.nodeValue = newText;
    }
    return;
  }

  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) {
    return;
  }

  if (root.nodeType === Node.ELEMENT_NODE &&
      ["SCRIPT", "STYLE", "NOSCRIPT"].includes(root.tagName)) {
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let current;
  while ((current = walker.nextNode())) textNodes.push(current);

  for (const node of textNodes) {
    const oldText = node.nodeValue;
    if (oldText && oldText.trim()) {
      const newText = translateText(oldText);
      if (newText !== oldText) node.nodeValue = newText;
    }
  }

  const elements = [];
  if (root.nodeType === Node.ELEMENT_NODE) elements.push(root);
  if (root.querySelectorAll) elements.push(...root.querySelectorAll("*"));

  for (const element of elements) {
    for (const attribute of ["placeholder", "title", "aria-label"]) {
      const oldValue = element.getAttribute(attribute);
      if (oldValue) {
        const newValue = translateText(oldValue);
        if (newValue !== oldValue) element.setAttribute(attribute, newValue);
      }
    }
  }
}

export default function HindiTranslator() {
  useEffect(() => {
    document.documentElement.lang = "hi";
    document.title = "कबाड़ीवाला कनेक्ट | स्मार्ट कबाड़ प्रबंधन";

    translateNode(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          translateNode(mutation.target);
        }

        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => translateNode(node));
        }

        if (mutation.type === "attributes") {
          const element = mutation.target;
          const attribute = mutation.attributeName;
          const oldValue = element.getAttribute(attribute);
          if (oldValue) {
            const newValue = translateText(oldValue);
            if (newValue !== oldValue) element.setAttribute(attribute, newValue);
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "title", "aria-label"]
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
