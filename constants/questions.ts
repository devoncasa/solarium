import { Questionnaire } from '../types';

export const questionnaireData: Questionnaire = {
  sections: [
    {
      id: 'generalInfo',
      title: {
        th: '1. ข้อมูลทั่วไป',
        en: '1. General Information',
      },
      questions: [
        { id: 'companyName', type: 'text', label: { th: 'ชื่อบริษัท/โรงงาน', en: 'Company/Factory Name' }, required: true },
        { id: 'contactPerson', type: 'text', label: { th: 'ผู้ติดต่อ', en: 'Contact Person' }, required: true },
        { id: 'position', type: 'text', label: { th: 'ตำแหน่ง', en: 'Position' } },
        { id: 'phone', type: 'tel', label: { th: 'เบอร์โทรศัพท์', en: 'Phone Number' }, required: true },
        { id: 'email', type: 'email', label: { th: 'อีเมล', en: 'Email' }, required: true },
        { id: 'factoryLocation', type: 'textarea', label: { th: 'ที่อยู่โรงงาน', en: 'Factory Address' } },
        { id: 'businessType', type: 'text', label: { th: 'ประเภทธุรกิจ', en: 'Type of Business' } },
      ],
    },
    {
      id: 'technicalInfo',
      title: {
        th: '2. ข้อมูลด้านเทคนิค (การใช้ไฟฟ้า)',
        en: '2. Technical Information (Electricity Usage)',
      },
      questions: [
        { 
          id: 'electricityProvider', 
          type: 'dropdown', 
          label: { th: 'ผู้ให้บริการไฟฟ้า', en: 'Electricity Provider' },
          options: [
            { value: 'MEA', label: { th: 'การไฟฟ้านครหลวง (กฟน.)', en: 'Metropolitan Electricity Authority (MEA)' } },
            { value: 'PEA', label: { th: 'การไฟฟ้าส่วนภูมิภาค (กฟภ.)', en: 'Provincial Electricity Authority (PEA)' } },
            { value: 'Other', label: { th: 'อื่นๆ', en: 'Other' } },
          ]
        },
        { 
          id: 'contractType', 
          type: 'dropdown', 
          label: { th: 'ประเภทมิเตอร์/สัญญา', en: 'Meter/Contract Type' },
          options: [
            { value: 'Normal', label: { th: 'Normal', en: 'Normal' } },
            { value: 'TOU', label: { th: 'Time of Use (TOU)', en: 'Time of Use (TOU)' } },
            { value: 'TOD', label: { th: 'Time of Day (TOD)', en: 'Time of Day (TOD)' } },
            { value: 'Other', label: { th: 'อื่นๆ', en: 'Other' } },
          ]
        },
        { id: 'avgMonthlyBill', type: 'number', label: { th: 'ค่าไฟเฉลี่ยต่อเดือน (บาท)', en: 'Average Monthly Bill (THB)' }, placeholder: { th: 'เช่น 500000', en: 'e.g., 500000' } },
        { id: 'peakDemand', type: 'number', label: { th: 'ความต้องการพลังงานไฟฟ้าสูงสุด (Peak Demand in kW)', en: 'Peak Electricity Demand (kW)' }, placeholder: { th: 'ดูจากบิลค่าไฟ', en: 'See from electricity bill' }, required: true },
        { id: 'onPeakConsumption', type: 'number', label: { th: 'หน่วยการใช้ไฟฟ้าช่วง On-Peak (kWh/เดือน)', en: 'On-Peak Electricity Consumption (kWh/month)' }, placeholder: { th: 'สำหรับมิเตอร์ TOU/TOD', en: 'For TOU/TOD meters' } },
        { id: 'offPeakConsumption', type: 'number', label: { th: 'หน่วยการใช้ไฟฟ้าช่วง Off-Peak (kWh/เดือน)', en: 'Off-Peak Electricity Consumption (kWh/month)' }, placeholder: { th: 'สำหรับมิเตอร์ TOU/TOD', en: 'For TOU/TOD meters' } },
        { id: 'transformerSize', type: 'number', label: { th: 'ขนาดหม้อแปลง (kVA)', en: 'Transformer Size (kVA)' }, placeholder: { th: 'เช่น 1000', en: 'e.g., 1000' } },
        { id: 'voltageLevel', type: 'text', label: { th: 'ระดับแรงดันไฟฟ้าของระบบ', en: 'System Voltage Level' }, placeholder: { th: 'เช่น 380/220V, 3 Phase, 4 Wire', en: 'e.g., 380/220V, 3 Phase, 4 Wire' } },
        { id: 'workingHours', type: 'text', label: { th: 'วัน-เวลาทำงานปกติ', en: 'Normal Working Days-Hours' }, placeholder: { th: 'เช่น จ-ศ 8:00-17:00', en: 'e.g., Mon-Fri 8:00-17:00' } },
        { 
          id: 'singleLineDiagram', 
          type: 'dropdown', 
          label: { th: 'มีแบบแปลนไฟฟ้า (Single-Line Diagram) หรือไม่', en: 'Is a Single-Line Diagram available?' },
          options: [
            { value: 'yes', label: { th: 'มี', en: 'Yes' } },
            { value: 'no', label: { th: 'ไม่มี', en: 'No' } },
            { value: 'not_sure', label: { th: 'ไม่แน่ใจ', en: 'Not Sure' } }
          ]
        },
        { id: 'mdbLocation', type: 'textarea', label: { th: 'ตำแหน่งของตู้จ่ายไฟฟ้าหลัก (MDB)', en: 'Location of the Main Distribution Board (MDB)' }, placeholder: { th: 'เช่น อาคาร 1, ชั้น 1, ห้องไฟฟ้า', en: 'e.g., Building 1, 1st Floor, Electrical Room' } },
        { 
          id: 'hasGenerator', 
          type: 'dropdown', 
          label: { th: 'มีเครื่องกำเนิดไฟฟ้าสำรองหรือไม่', en: 'Is there a backup generator?' },
          options: [
            { value: 'yes', label: { th: 'มี', en: 'Yes' } },
            { value: 'no', label: { th: 'ไม่มี', en: 'No' } }
          ]
        },
      ],
    },
    {
      id: 'siteInfo',
      title: {
        th: '3. ข้อมูลพื้นที่ติดตั้ง',
        en: '3. Installation Site Information',
      },
      questions: [
        { 
          id: 'installationArea', 
          type: 'dropdown', 
          label: { th: 'พื้นที่ติดตั้งที่สนใจ', en: 'Interested Installation Area' },
          options: [
            { value: 'rooftop', label: { th: 'หลังคา', en: 'Rooftop' } },
            { value: 'ground', label: { th: 'พื้นดิน', en: 'Ground Mount' } },
            { value: 'carport', label: { th: 'โรงจอดรถ', en: 'Carport' } },
            { value: 'floating', label: { th: 'ทุ่นลอยน้ำ', en: 'Floating' } },
          ]
        },
        { 
          id: 'roofType', 
          type: 'dropdown', 
          label: { th: 'ประเภทหลังคา', en: 'Roof Type' },
          options: [
            { value: 'metalSheet', label: { th: 'เมทัลชีท', en: 'Metal Sheet' } },
            { value: 'concrete', label: { th: 'คอนกรีต', en: 'Concrete Slab' } },
            { value: 'tiles', label: { th: 'กระเบื้อง', en: 'Tiles' } },
            { value: 'Other', label: { th: 'อื่นๆ', en: 'Other' } },
          ]
        },
        { id: 'roofAge', type: 'number', label: { th: 'อายุหลังคา (ปี)', en: 'Roof Age (Years)' } },
        { id: 'availableArea', type: 'number', label: { th: 'พื้นที่ว่างสำหรับติดตั้ง (ตร.ม.)', en: 'Available Area for Installation (sq.m.)' } },
        { id: 'siteObstructions', type: 'textarea', label: { th: 'สิ่งกีดขวาง/เงาบดบัง', en: 'Obstructions / Shading' }, placeholder: { th: 'เช่น อาคารสูง, ต้นไม้ใหญ่', en: 'e.g., Tall buildings, large trees' } },
        { 
          id: 'proposedInstallationDate', 
          type: 'text', 
          label: { th: 'วันที่คาดว่าจะติดตั้ง', en: 'Proposed Installation Date' },
          placeholder: { th: 'ระบุเดือน/ปี หรือไตรมาส', en: 'Specify month/year or quarter' }
        },
        { 
          id: 'estimatedSystemSize', 
          type: 'number', 
          label: { th: 'ขนาดระบบที่คาดหวัง (kWp)', en: 'Estimated System Size (kWp)' },
          placeholder: { th: 'เช่น 100 kWp', en: 'e.g., 100 kWp' }
        },
      ],
    },
    {
      id: 'siteAssessment',
      title: {
        th: '4. การประเมินหน้างาน (เพิ่มเติม)',
        en: '4. Site Assessment (Additional)',
      },
      questions: [
        { 
          id: 'roofMaterial', 
          type: 'dropdown', 
          label: { th: 'วัสดุหลังคา', en: 'Roof Material' },
          options: [
            { value: 'metalSheet', label: { th: 'เมทัลชีท', en: 'Metal Sheet' } },
            { value: 'concrete', label: { th: 'คอนกรีต', en: 'Concrete' } },
            { value: 'tiles', label: { th: 'กระเบื้อง', en: 'Tiles' } },
            { value: 'Other', label: { th: 'อื่นๆ', en: 'Other' } },
          ]
        },
        { 
          id: 'roofPitch', 
          type: 'text', 
          label: { th: 'ความลาดชันของหลังคา (องศา)', en: 'Roof Pitch (Degrees)' },
          placeholder: { th: 'เช่น 15 องศา', en: 'e.g., 15 degrees' } 
        },
        { 
          id: 'structuralIntegrity', 
          type: 'textarea', 
          label: { th: 'สภาพโครงสร้างหลังคา (มีปัญหารั่วซึมหรือความแข็งแรงหรือไม่)', en: 'Roof Structural Condition (Any known issues with leaks or integrity?)' },
          placeholder: { th: 'โปรดอธิบายสภาพปัจจุบัน เช่น แข็งแรงดี, เคยมีประวัติรั่วซึม, ต้องซ่อมแซม', en: 'Please describe the current condition, e.g., good condition, history of leaks, needs repair' } 
        },
        { 
          id: 'localRegulations', 
          type: 'textarea', 
          label: { th: 'ข้อบัญญัติท้องถิ่นหรือใบอนุญาตที่จำเป็น (ถ้าทราบ)', en: 'Local Regulations or Required Permits (if known)' },
          placeholder: { th: 'เช่น ข้อกำหนดของนิคมอุตสาหกรรม, ใบอนุญาต อ.1', en: 'e.g., Industrial estate regulations, building permits' } 
        },
      ],
    },
    {
      id: 'projectFeasibility',
      title: {
        th: '5. ความเป็นไปได้ของโครงการ',
        en: '5. Project Feasibility',
      },
      questions: [
        { 
          id: 'financingOption', 
          type: 'dropdown', 
          label: { th: 'รูปแบบการลงทุนที่สนใจ', en: 'Preferred Financing Option' },
          options: [
            { value: 'self', label: { th: 'ลงทุนเอง (Self-financed)', en: 'Self-financed' } },
            { value: 'loan', label: { th: 'สินเชื่อจากธนาคาร (Bank Loan)', en: 'Bank Loan' } },
            { value: 'bot', label: { th: 'BOT (Build-Operate-Transfer)', en: 'BOT (Build-Operate-Transfer)' } },
            { value: 'Other', label: { th: 'อื่นๆ', en: 'Other' } },
          ]
        },
        { 
          id: 'expectedROI', 
          type: 'text', 
          label: { th: 'ระยะเวลาคืนทุนที่คาดหวัง (ปี)', en: 'Expected Return on Investment (ROI) Period (Years)' },
          placeholder: { th: 'เช่น 5-7 ปี', en: 'e.g., 5-7 years' } 
        },
        { 
          id: 'timelineGoals', 
          type: 'textarea', 
          label: { th: 'เป้าหมาย/กำหนดการของโครงการ', en: 'Project Timeline Goals' },
          placeholder: { th: 'เช่น ต้องการให้ระบบเสร็จสิ้นภายในไตรมาสที่ 4 ปีนี้', en: 'e.g., Need the system to be operational by Q4 of this year' } 
        },
      ],
    }
  ],
};