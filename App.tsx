import React, { useState } from 'react';
import { Icon } from './components/Icon';
import { ShapeType, FormData, Criterion, IconName } from './types';

// --- Constants & Data ---

const PRESETS = [
  'Rubik', 'Sổ tay', 'Bình giữ nhiệt', 'Gấu bông', 'Ly trà sữa', 
  'Truyện tranh', 'Móc khóa', 'Bánh tráng', 'Tai nghe', 'Vòng tay'
];

const OCCASIONS = [
  'Sinh nhật', '20/11', '8/3', 'Giáng sinh', 'Valentine', 'Tết', 'Kỷ niệm'
];

const CRITERIA: Criterion[] = [
  { id: 'collapsible', label: 'Hộp xếp gọn sau khi dùng', searchKeyword: 'collapsible magnetic rigid box template' },
  { id: 'rigid', label: 'Hộp giấy bìa cứng', searchKeyword: 'rigid setup box packaging dieline' },
  { id: 'gable', label: 'Hộp có quai xách', searchKeyword: 'gable box handle template' },
  { id: 'window', label: 'Hộp có chỗ nhìn vào bên trong', searchKeyword: 'box with acetate window patching template' },
  { id: 'eco', label: 'Thân thiện môi trường', searchKeyword: 'kraft paper origami box no glue template' },
  { id: 'lid_base', label: 'Hộp nắp rời', searchKeyword: 'two piece rigid box lid and base template' },
];

const SHAPES = [
  { id: ShapeType.RECTANGULAR, name: 'Hộp Chữ Nhật (Rectangular)', keyword: 'rectangular box' },
  { id: ShapeType.CUBE, name: 'Hộp Lập Phương (Cube)', keyword: 'cube box' },
  { id: ShapeType.TRI_PRISM, name: 'Lăng trụ đứng tam giác', keyword: 'triangular prism packaging' },
  { id: ShapeType.QUAD_PRISM, name: 'Lăng trụ đứng tứ giác', keyword: 'quadrangular prism box template' },
];

const App: React.FC = () => {
  // --- State ---
  const [formData, setFormData] = useState<FormData>({
    name: '',
    preset: PRESETS[0],
    occasion: OCCASIONS[0],
    shape: ShapeType.RECTANGULAR,
    length: 100,
    width: 80,
    height: 50,
    side: 80,
    baseEdge1: 60,
    baseEdge2: 60,
    baseEdge3: 60,
    baseEdge4: 60,
  });

  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

  // --- Handlers ---
  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCriterion = (id: string) => {
    setSelectedCriteria(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  // --- Search Logic ---
  const openReference = (platform: string) => {
    // 1. Get Base Shape Keyword
    const shapeObj = SHAPES.find(s => s.id === formData.shape);
    const shapeKeyword = shapeObj ? shapeObj.keyword : 'gift box';

    // 2. Get Criteria Keywords
    const criteriaKeywords = selectedCriteria
      .map(id => CRITERIA.find(c => c.id === id)?.searchKeyword || '')
      .join(' ');

    // 3. Construct Query Base
    let query = `${shapeKeyword} ${criteriaKeywords}`.trim();

    // 4. Platform Specific Adjustments
    if (platform === 'pinterest') {
      query += " DIY handmade";
    } else if (platform === 'google') {
      query += " dieline vector";
    } else {
      query += " dieline template packaging design";
    }

    const encodedQuery = encodeURIComponent(query);

    // 5. Determine URL
    let url = '';
    switch (platform) {
      case 'google': url = `https://www.google.com/search?q=${encodedQuery}&tbm=isch`; break;
      case 'pinterest': url = `https://www.pinterest.com/search/pins/?q=${encodedQuery}`; break;
      case 'youtube': url = `https://www.youtube.com/results?search_query=${encodedQuery}+tutorial`; break;
      case 'behance': url = `https://www.behance.net/search/projects?search=${encodedQuery}`; break;
      case 'freepik': url = `https://www.freepik.com/search?format=search&query=${encodedQuery}`; break;
      case 'shutterstock': url = `https://www.shutterstock.com/search/${encodedQuery}`; break;
    }

    if (url) window.open(url, '_blank');
  };

  const isLidBase = selectedCriteria.includes('lid_base');

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-base">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex items-center space-x-4 pb-6 border-b border-slate-200">
          <div className="p-3 bg-brand-600 rounded-xl text-white shadow-lg shadow-brand-500/30">
            <Icon name="package" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight uppercase">Trợ lý AI hỗ trợ xếp hộp quà</h1>
            <p className="text-slate-500 text-lg">Công cụ hỗ trợ thiết kế vỏ hộp quà</p>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* COLUMN 1: Inputs */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className="bg-slate-50 px-8 py-5 border-b border-slate-200 flex items-center space-x-3">
              <Icon name="sliders" className="text-brand-600" size={24} />
              <h2 className="font-bold text-slate-700 text-lg">Thông số món quà</h2>
            </div>
            
            <div className="p-8 space-y-6 flex-1">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-base font-medium text-slate-600">Tên món quà</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ví dụ: Quà sinh nhật Lan"
                  className="w-full px-5 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 outline-none transition-all text-base"
                />
              </div>

              {/* Preset & Occasion Row */}
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-base font-medium text-slate-600">Loại quà</label>
                  <select 
                    value={formData.preset}
                    onChange={(e) => handleInputChange('preset', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 outline-none bg-white text-base"
                  >
                    {PRESETS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-base font-medium text-slate-600">Dịp tặng</label>
                  <select 
                    value={formData.occasion}
                    onChange={(e) => handleInputChange('occasion', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 outline-none bg-white text-base"
                  >
                    {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Shape Selection */}
              <div className="space-y-3">
                <label className="block text-base font-medium text-slate-600 flex items-center gap-2">
                  <Icon name="ruler" size={20} /> Hình dạng hộp quà mong muốn
                </label>
                <select 
                  value={formData.shape}
                  onChange={(e) => handleInputChange('shape', e.target.value as ShapeType)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 outline-none bg-white font-medium text-brand-700 text-base"
                >
                  {SHAPES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              {/* Dynamic Dimensions */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Kích thước (mm)</p>
                
                {formData.shape === ShapeType.RECTANGULAR && (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-3 gap-4">
                      <DimInput label="Dài (L)" val={formData.length} setter={(v) => handleInputChange('length', v)} />
                      <DimInput label="Rộng (W)" val={formData.width} setter={(v) => handleInputChange('width', v)} />
                      <DimInput label="Cao (H)" val={formData.height} setter={(v) => handleInputChange('height', v)} />
                    </div>
                  </div>
                )}

                {formData.shape === ShapeType.CUBE && (
                  <div className="grid grid-cols-1">
                    <DimInput label="Cạnh (Side)" val={formData.side} setter={(v) => handleInputChange('side', v)} />
                  </div>
                )}

                {formData.shape === ShapeType.TRI_PRISM && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <DimInput label="Cạnh đáy 1" val={formData.baseEdge1} setter={(v) => handleInputChange('baseEdge1', v)} />
                      <DimInput label="Cạnh đáy 2" val={formData.baseEdge2} setter={(v) => handleInputChange('baseEdge2', v)} />
                      <DimInput label="Cạnh đáy 3" val={formData.baseEdge3} setter={(v) => handleInputChange('baseEdge3', v)} />
                    </div>
                    <DimInput label="Chiều cao (H)" val={formData.height} setter={(v) => handleInputChange('height', v)} />
                  </div>
                )}

                {formData.shape === ShapeType.QUAD_PRISM && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <DimInput label="Cạnh đáy 1" val={formData.baseEdge1} setter={(v) => handleInputChange('baseEdge1', v)} />
                      <DimInput label="Cạnh đáy 2" val={formData.baseEdge2} setter={(v) => handleInputChange('baseEdge2', v)} />
                      <DimInput label="Cạnh đáy 3" val={formData.baseEdge3} setter={(v) => handleInputChange('baseEdge3', v)} />
                      <DimInput label="Cạnh đáy 4" val={formData.baseEdge4} setter={(v) => handleInputChange('baseEdge4', v)} />
                    </div>
                    <DimInput label="Chiều cao (H)" val={formData.height} setter={(v) => handleInputChange('height', v)} />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* COLUMN 2: Criteria */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
             <div className="bg-slate-50 px-8 py-5 border-b border-slate-200 flex items-center space-x-3">
              <Icon name="check" className="text-brand-600" size={24} />
              <h2 className="font-bold text-slate-700 text-lg">Tiêu chí ưu tiên</h2>
            </div>
            
            <div className="p-8 grid grid-cols-1 gap-4 flex-1 overflow-y-auto">
              {CRITERIA.map(criterion => {
                const isSelected = selectedCriteria.includes(criterion.id);
                return (
                  <button
                    key={criterion.id}
                    onClick={() => toggleCriterion(criterion.id)}
                    className={`
                      relative p-5 rounded-xl border text-left transition-all duration-300 ease-out flex items-center justify-between group select-none
                      active:scale-[0.96] outline-none
                      ${isSelected 
                        ? 'border-brand-600 bg-brand-50 text-brand-800 shadow-lg shadow-brand-500/20 scale-[1.03] ring-2 ring-brand-500/30 ring-offset-1 z-10' 
                        : 'border-slate-200 hover:border-brand-300 hover:bg-slate-50 text-slate-600 hover:shadow-md hover:-translate-y-0.5'}
                    `}
                  >
                    <span className="font-medium text-base">{criterion.label}</span>
                    <div className={`
                      w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300
                      ${isSelected 
                        ? 'bg-brand-500 border-brand-500 scale-110 shadow-sm' 
                        : 'border-slate-300 bg-white group-hover:border-brand-400'}
                    `}>
                      <span className={`transform transition-all duration-200 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                         <Icon name="check" className="text-white" size={14} />
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {/* COLUMN 3: Dashboard */}
          <div className="flex flex-col gap-6 h-full">
            
            {/* Zone 1: References */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="bg-indigo-50 px-8 py-5 border-b border-indigo-100 flex items-center space-x-3">
                <Icon name="search" className="text-indigo-600" size={24} />
                <h2 className="font-bold text-indigo-800 text-lg">Hộp quà và bản vẽ</h2>
              </div>
              
              <div className="p-8">
                <p className="text-sm text-slate-500 mb-6 text-center">
                  Hệ thống tìm kiếm thông minh dựa trên thông số bạn nhập.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <RefButton 
                    label="Google" color="bg-blue-500 hover:bg-blue-600" 
                    icon="google" onClick={() => openReference('google')} 
                  />
                  <RefButton 
                    label="Pinterest" color="bg-red-500 hover:bg-red-600" 
                    icon="pinterest" onClick={() => openReference('pinterest')} 
                  />
                  <RefButton 
                    label="YouTube" color="bg-red-600 hover:bg-red-700" 
                    icon="youtube" onClick={() => openReference('youtube')} 
                  />
                  <RefButton 
                    label="Behance" color="bg-blue-800 hover:bg-blue-900" 
                    icon="behance" onClick={() => openReference('behance')} 
                  />
                  <RefButton 
                    label="Freepik" color="bg-purple-600 hover:bg-purple-700" 
                    icon="freepik" onClick={() => openReference('freepik')} 
                  />
                  <RefButton 
                    label="Shutterstock" color="bg-orange-500 hover:bg-orange-600" 
                    icon="shutterstock" onClick={() => openReference('shutterstock')} 
                  />
                </div>
              </div>
            </section>

            {/* Zone 2: AI Calculated Dimensions (NEW) */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="bg-emerald-50 px-8 py-5 border-b border-emerald-100 flex items-center space-x-3">
                 <Icon name="ruler" className="text-emerald-600" size={24} />
                 <h2 className="font-bold text-emerald-800 text-lg">Kích thước các hộp quà do AI tính toán</h2>
               </div>
               <div className="p-8 space-y-4">
                 <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                    <p className="text-sm text-emerald-600 mb-2 font-medium uppercase tracking-wide">Kích thước cắt (Thân hộp):</p>
                    <ul className="space-y-1 text-slate-700 font-mono font-medium text-lg">
                      {formData.shape === ShapeType.RECTANGULAR && (
                        <>
                          <li>Chiều dài: {formData.length} mm</li>
                          <li>Chiều rộng: {formData.width} mm</li>
                          <li>Chiều cao: {formData.height} mm</li>
                        </>
                      )}
                      {formData.shape === ShapeType.CUBE && <li>Cạnh: {formData.side} mm</li>}
                      {formData.shape === ShapeType.TRI_PRISM && (
                        <>
                          <li>Cao: {formData.height} mm</li>
                          <li>Đáy: {formData.baseEdge1}, {formData.baseEdge2}, {formData.baseEdge3} mm</li>
                        </>
                      )}
                      {formData.shape === ShapeType.QUAD_PRISM && (
                         <>
                          <li>Cao: {formData.height} mm</li>
                          <li>Đáy: {formData.baseEdge1}, {formData.baseEdge2}, {formData.baseEdge3}, {formData.baseEdge4} mm</li>
                        </>
                      )}
                    </ul>
                 </div>
                 
                 {isLidBase && (formData.shape === ShapeType.RECTANGULAR || formData.shape === ShapeType.CUBE) && (
                   <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                      <p className="text-sm text-blue-600 mb-2 font-medium uppercase tracking-wide">Kích thước cắt (Nắp hộp - Dư 2mm):</p>
                      <ul className="space-y-1 text-slate-700 font-mono font-medium text-lg">
                        {formData.shape === ShapeType.RECTANGULAR ? (
                          <>
                            <li>Chiều dài: {formData.length + 2} mm</li>
                            <li>Chiều rộng: {formData.width + 2} mm</li>
                          </>
                        ) : (
                          <>
                            <li>Cạnh: {formData.side + 2} mm</li>
                          </>
                        )}
                      </ul>
                   </div>
                 )}
               </div>
            </section>

            {/* Zone 3: Materials */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1">
              <div className="bg-slate-50 px-8 py-5 border-b border-slate-200 flex items-center space-x-3">
                <Icon name="clipboard" className="text-brand-600" size={24} />
                <h2 className="font-bold text-slate-700 text-lg">Vật liệu cần chuẩn bị</h2>
              </div>
              
              <div className="p-8 space-y-5">
                {/* Paper Box */}
                <div className="p-5 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-4">
                   <div className="p-2.5 bg-white rounded-lg shadow-sm text-blue-500">
                      <Icon name="image" size={24} />
                   </div>
                   <div>
                     <h3 className="text-base font-bold text-blue-900">Loại giấy/bìa cứng</h3>
                     <p className="text-sm text-blue-700 mt-1 leading-relaxed">
                       Carton lạnh (2mm), Giấy Ivory (350gsm), hoặc Giấy Kraft Nhật.
                       Kích thước: Khổ A2 hoặc A1 tùy theo bản vẽ trải phẳng.
                     </p>
                   </div>
                </div>

                {/* Tools Box */}
                <div className="p-5 rounded-xl bg-orange-50 border border-orange-100 flex items-start gap-4">
                   <div className="p-2.5 bg-white rounded-lg shadow-sm text-orange-500">
                      <Icon name="palette" size={24} />
                   </div>
                   <div>
                     <h3 className="text-base font-bold text-orange-900">Dụng cụ & Phụ kiện</h3>
                     <p className="text-sm text-orange-700 mt-1 leading-relaxed">
                       Dao rọc giấy, Thước thép, Keo sữa/Băng keo 2 mặt, Bút chì, Bàn cắt (Cutting mat).
                     </p>
                   </div>
                </div>

              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const DimInput: React.FC<{
  label: string; 
  val: number; 
  setter: (v: number) => void
}> = ({ label, val, setter }) => (
  <div className="relative group">
    <label className="block text-xs text-slate-500 mb-1.5 font-bold uppercase group-focus-within:text-brand-600 transition-colors">{label}</label>
    <div className="relative">
      <input 
        type="number" 
        value={val}
        onChange={(e) => setter(Number(e.target.value))}
        className="w-full pl-4 pr-10 py-3 rounded-lg border border-slate-300 text-base font-medium focus:border-brand-500 focus:ring-4 focus:ring-brand-100 outline-none shadow-sm transition-all"
      />
      <span className="absolute right-3 top-3.5 text-sm text-slate-400 select-none font-medium">mm</span>
    </div>
  </div>
);

const RefButton: React.FC<{
  label: string;
  color: string;
  icon: IconName;
  onClick: () => void;
}> = ({ label, color, icon, onClick }) => (
  <button 
    onClick={onClick}
    className={`${color} text-white p-3 rounded-xl shadow-md hover:shadow-lg hover:shadow-slate-300/50 transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center gap-2 h-24 w-full`}
  >
    <Icon name={icon} size={24} />
    <span className="text-sm font-bold">{label}</span>
  </button>
);

export default App;