import React, { useEffect, useMemo, useState } from "react";
import {
  Search, Camera, ShoppingCart, ShoppingBag, Smartphone, ReceiptText,
  ArrowLeftRight, Plane, Landmark, BriefcaseBusiness, ChevronLeft,
  ChevronRight, Copy, Share2, QrCode, Home, MessageSquare, Menu,
  CreditCard, FileText, CarFront, House, Megaphone, CheckCircle2,
  X, ScanLine, Wallet, Trash2, Image as ImageIcon, FolderOpen
} from "lucide-react";

/*
 * Kaspi-style учебный макет.
 * Все персональные данные ниже вымышлены. Это не настоящий документ.
 */
const DEMO_PERSON = {
  fullName: "Айдар Ерланұлы Нұрланов",
  iin: "071214501234",
  birthDate: "14.12.2007",
  documentNumber: "DEMO-482951",
  issueDate: "12.05.2025",
  expiryDate: "12.05.2035",
};

const SERVICES = [
  { Icon: ShoppingBag, title: "Магазин" },
  { Icon: Smartphone, title: "Мой Банк" },
  { Icon: ReceiptText, title: "Платежи" },
  { Icon: ArrowLeftRight, title: "Переводы" },
  { Icon: ShoppingBag, title: "Magnum" },
  { Icon: Plane, title: "Travel" },
  { Icon: Landmark, title: "Госуслуги" },
  { Icon: BriefcaseBusiness, title: "Работа" },
];

function PageHeader({ title, onBack }) {
  return (
    <header className="page-head">
      <button className="back" onClick={onBack} aria-label="Назад">
        <ChevronLeft />
      </button>
      <b>{title}</b>
    </header>
  );
}

function BottomNavigation({ active, onNavigate }) {
  const items = [
    { key: "home", label: "Главная", Icon: Home },
    { key: "qr", label: "Kaspi QR", Icon: QrCode },
    { key: "messages", label: "Сообщения", Icon: MessageSquare },
    { key: "services", label: "Сервисы", Icon: Menu },
  ];

  return (
    <nav className="bottom">
      {items.map(({ key, label, Icon }) => (
        <button
          key={key}
          className={active === key ? "selected" : ""}
          onClick={() => onNavigate(key)}
        >
          <Icon size={24} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function HomeScreen({ navigate }) {
  const products = [
    { name: "POCO X6 Pro Max", price: "309 990 ₸", bonus: "294 491 ₸", rating: "4.9", reviews: "415", style: "phone-one" },
    { name: "Samsung Galaxy", price: "369 999 ₸", bonus: "351 500 ₸", rating: "4.8", reviews: "806", style: "phone-two" },
    { name: "Смартфон NOTE", price: "199 990 ₸", bonus: "185 991 ₸", rating: "4.9", reviews: "7", style: "phone-three" },
  ];

  return (
    <>
      <div className="searchbar">
        <Search size={21} />
        <input aria-label="Поиск" placeholder="Поиск по Kaspi.kz" />
        <button aria-label="Камера" onClick={() => navigate("notice")}><Camera /></button>
        <button aria-label="Корзина" onClick={() => navigate("notice")}><ShoppingCart /></button>
      </div>

      <div className="service-grid">
        {SERVICES.map(({ Icon, title }) => (
          <button
            className="service"
            key={title}
            onClick={() => title === "Госуслуги" ? navigate("government") : navigate("notice")}
          >
            <span className="service-icon"><Icon size={29} /></span>
            <span>{title}</span>
          </button>
        ))}
      </div>

      <div className="quick-links">
        <button onClick={() => navigate("notice")}><span className="quick-icon red-icon">0·0·24</span>Рассрочка 0-0-24</button>
        <button onClick={() => navigate("notice")}><span className="quick-icon yellow-icon">0·0·12</span>Рассрочка 0-0-12</button>
        <button onClick={() => navigate("notice")}><span className="quick-icon yellow-icon"><Wallet /></span>Накопительный депозит</button>
        <button onClick={() => navigate("notice")}><span className="quick-icon yellow-icon"><CreditCard /></span>Kaspi Депозит</button>
      </div>

      <h3 className="section-title">Вы недавно смотрели</h3>
      <div className="products">
        {products.map((product) => (
          <article className="product" key={product.name}>
            <div className={`product-img ${product.style}`}><Smartphone size={54} /></div>
            <b>{product.price}</b>
            <small className="bonus">{product.bonus}<br />с учетом Бонусов</small>
            <div className="prod-name">{product.name}</div>
            <small>{product.rating} <span className="star">★</span> ({product.reviews})</small>
          </article>
        ))}
      </div>

      <BottomNavigation active="home" onNavigate={(key) => {
        if (key === "home") return;
        if (key === "services") navigate("government");
        else navigate("notice");
      }} />
    </>
  );
}

function GovernmentScreen({ navigate, tab, setTab }) {
  const [category, setCategory] = useState("Популярные");
  const [query, setQuery] = useState("");
  const categories = [
    { title: "Популярные", Icon: Megaphone },
    { title: "Справки", Icon: CheckCircle2 },
    { title: "Авто", Icon: CarFront },
    { title: "Жильё", Icon: House },
  ];
  const services = [
    { title: "Стать самозанятым", description: "Открыть счет и начать принимать оплату в Kaspi.kz", category: "Популярные" },
    { title: "Переоформление автомобиля", description: "Подать заявление онлайн", category: "Авто" },
    { title: "Прописка", description: "Временная и постоянная регистрация", category: "Жильё" },
  ];

  const filteredServices = useMemo(() => services.filter((item) => {
    const matchesText = `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "Популярные" || category === "Справки" || item.category === category;
    return matchesText && matchesCategory;
  }), [query, category]);

  return (
    <>
      <PageHeader title="Госуслуги" onBack={() => navigate("home")} />
      <div className="tabs">
        <button className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>Все услуги</button>
        <button className={tab === "mine" ? "active" : ""} onClick={() => setTab("mine")}>Мои заявки</button>
      </div>

      {tab === "all" ? (
        <>
          <div className="gov-search">
            <Search />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по Госуслугам" />
            {query && <button onClick={() => setQuery("")} aria-label="Очистить"><X size={17} /></button>}
          </div>

          <div className="doc-cards">
            <button onClick={() => navigate("document")}>
              <span className="id-mini"><CreditCard /></span>
              Удостоверение<br />личности
            </button>
            <button onClick={() => navigate("notice")}>
              <span className="social-mini">36</span>
              Социальный ID
            </button>
          </div>

          <button className="all-docs" onClick={() => navigate("document")}>
            Все документы <ChevronRight />
          </button>

          <div className="categories">
            {categories.map(({ title, Icon }) => (
              <button className={category === title ? "chosen" : ""} key={title} onClick={() => setCategory(title)}>
                <span><Icon size={26} /></span>{title}
              </button>
            ))}
          </div>

          <h3 className="section-title">{category === "Популярные" ? "Популярные услуги" : category}</h3>
          <div className="gov-list">
            {filteredServices.map((item, index) => (
              <button key={item.title} onClick={() => navigate(index === 1 ? "notice" : "notice")}>
                <span className="gov-icon">
                  {index === 0 ? <BriefcaseBusiness /> : index === 1 ? <CarFront /> : <House />}
                </span>
                <span><b>{item.title}</b><small>{item.description}</small></span>
                <ChevronRight />
              </button>
            ))}
            {filteredServices.length === 0 && <p className="empty-note">Ничего не найдено</p>}
          </div>
        </>
      ) : (
        <div className="empty">
          <FileText size={40} />
          <b>У вас пока нет заявок</b>
          <span>Здесь будут отображаться ваши обращения</span>
        </div>
      )}

      <BottomNavigation active="services" onNavigate={(key) => key === "home" ? navigate("home") : null} />
    </>
  );
}

function DocumentUploader() {
  const [files, setFiles] = useState([]);
  const [openedFile, setOpenedFile] = useState(null);

  useEffect(() => () => {
    files.forEach((file) => URL.revokeObjectURL(file.url));
  }, [files]);

  function addFiles(fileList) {
    const selected = Array.from(fileList || []);
    const accepted = selected.filter((file) =>
      file.type.startsWith("image/") || file.type === "application/pdf"
    );
    const newFiles = accepted.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
    }));
    setFiles((current) => [...current, ...newFiles]);
  }

  function deleteFile(id) {
    const file = files.find((item) => item.id === id);
    if (file) URL.revokeObjectURL(file.url);
    setFiles((current) => current.filter((item) => item.id !== id));
    if (openedFile?.id === id) setOpenedFile(null);
  }

  function FileInput({ label, className }) {
    return (
      <label className={className}>
        {label}
        <input
          type="file"
          accept="image/*,.pdf,application/pdf"
          multiple
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </label>
    );
  }

  return (
    <section className="uploads">
      <div className="upload-head">
        <div><b>Мои документы</b><small>Фото и PDF-файлы</small></div>
        <FileInput label="＋ Загрузить" className="upload-btn" />
      </div>

      <div className="upload-drop">
        <FolderOpen size={30} />
        <b>Добавить документы</b>
        <span>Можно выбрать несколько файлов: JPG, PNG или PDF</span>
        <FileInput label="Выбрать файлы" className="drop-select" />
      </div>

      {files.length > 0 && (
        <div className="uploaded-list">
          {files.map((file) => (
            <div className="uploaded-item" key={file.id}>
              <button className="uploaded-preview" onClick={() => setOpenedFile(file)}>
                {file.type.startsWith("image/") ? <img src={file.url} alt={file.name} /> : <FileText size={30} />}
              </button>
              <button className="uploaded-name" onClick={() => setOpenedFile(file)}>
                <b>{file.name}</b>
                <small>{(file.size / 1024).toFixed(0)} КБ · {file.type === "application/pdf" ? "PDF" : "Изображение"}</small>
              </button>
              <button className="remove-file" onClick={() => deleteFile(file.id)} aria-label="Удалить файл"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
      )}

      {openedFile && (
        <div className="overlay" onClick={() => setOpenedFile(null)}>
          <div className="document-viewer" onClick={(event) => event.stopPropagation()}>
            <div className="viewer-head">
              <b>{openedFile.name}</b>
              <button onClick={() => setOpenedFile(null)} aria-label="Закрыть"><X /></button>
            </div>
            {openedFile.type.startsWith("image/") ? (
              <img className="viewer-image" src={openedFile.url} alt={openedFile.name} />
            ) : (
              <iframe title={openedFile.name} src={openedFile.url} className="viewer-pdf" />
            )}
            <a className="download-file" href={openedFile.url} download={openedFile.name}>Скачать документ</a>
          </div>
        </div>
      )}
    </section>
  );
}

function IdentityDocumentScreen({ navigate }) {
  return (
    <>
      <PageHeader title="Удостоверение личности" onBack={() => navigate("government")} />
      <div className="tabs doc-tabs">
        <button className="active">Документ</button>
        <button onClick={() => navigate("details")}>Реквизиты</button>
      </div>

      <div className="id-card">
        <div className="id-top">
          <span>ҚАЗАҚСТАН РЕСПУБЛИКАСЫ<br />ЖЕКЕ КУӘЛІК</span>
          <div className="crest">✦</div>
          <span>РЕСПУБЛИКА КАЗАХСТАН<br />УДОСТОВЕРЕНИЕ ЛИЧНОСТИ</span>
        </div>
        <div className="id-body">
          <div className="avatar"><div className="hair" /><div className="face" /><div className="shirt" /></div>
          <div className="id-data">
            <small>ТЕГІ / ФАМИЛИЯ</small><b>НҰРЛАНОВ</b>
            <small>АТЫ / ИМЯ</small><b>АЙДАР</b>
            <small>ӘКЕСІНІҢ АТЫ / ОТЧЕСТВО</small><b>ЕРЛАНҰЛЫ</b>
            <div className="id-bottom-data">
              <span><small>ТУҒАН КҮНІ / ДАТА РОЖДЕНИЯ</small><b>{DEMO_PERSON.birthDate}</b></span>
              <span><small>ЖЫНЫСЫ / ПОЛ</small><b>Е</b></span>
            </div>
          </div>
        </div>
        <div className="id-footer">
          <div className="fake-chip" />
          <div>
            <small>ҚАЗАҚСТАН / КАЗАХСТАН</small><b>ҚАЗАҚ / КАЗАХ</b>
            <small>ЖАРАМДЫ / ДЕЙСТВИТЕЛЬНО ДО</small><b>{DEMO_PERSON.expiryDate}</b>
          </div>
          <div className="doc-number">DEMO</div>
        </div>
        <div className="watermark">DEMO • НЕ ЯВЛЯЕТСЯ ДОКУМЕНТОМ</div>
      </div>

      <DocumentUploader />

      <div className="id-actions">
        <button className="primary" onClick={() => navigate("present")}><ScanLine /> Предъявить документ</button>
        <button className="secondary" onClick={() => navigate("share")}><Share2 /> Отправить документ</button>
      </div>
      <BottomNavigation active="services" onNavigate={(key) => key === "home" ? navigate("home") : null} />
    </>
  );
}

function DetailsScreen({ navigate }) {
  const rows = [
    ["ФИО", DEMO_PERSON.fullName],
    ["ИИН", DEMO_PERSON.iin],
    ["Дата рождения", DEMO_PERSON.birthDate],
    ["Номер документа", DEMO_PERSON.documentNumber],
    ["Дата выдачи", DEMO_PERSON.issueDate],
    ["Срок действия", DEMO_PERSON.expiryDate],
  ];
  const [copied, setCopied] = useState("");

  async function copyValue(value, label) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1400);
    } catch {
      setCopied("Буфер недоступен");
    }
  }

  return (
    <>
      <PageHeader title="Удостоверение личности" onBack={() => navigate("document")} />
      <div className="tabs doc-tabs">
        <button onClick={() => navigate("document")}>Документ</button>
        <button className="active">Реквизиты</button>
      </div>
      <div className="details">
        {rows.map(([label, value]) => (
          <div className="detail-row" key={label}>
            <div><small>{label}</small><span>{value}</span></div>
            <button onClick={() => copyValue(value, label)} aria-label={`Копировать: ${label}`}>
              {copied === label ? <CheckCircle2 color="#1c9b59" /> : <Copy />}
            </button>
          </div>
        ))}
      </div>
      <button className="secondary share-details" onClick={() => navigate("share")}><Share2 /> Отправить реквизиты</button>
      <BottomNavigation active="services" onNavigate={(key) => key === "home" ? navigate("home") : null} />
    </>
  );
}

function DemoModal({ type, onClose }) {
  const isPresentation = type === "present";
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Закрыть"><X /></button>
        {isPresentation ? <QrCode size={48} /> : <CheckCircle2 size={48} />}
        <h3>{isPresentation ? "Предъявление документа" : "Демонстрационный режим"}</h3>
        <p>
          {isPresentation
            ? "Это демонстрационный экран. Проверка документа и настоящий QR-код не выполняются."
            : "Используются только вымышленные данные. Реальная отправка документов отключена."}
        </p>
        <button className="primary" onClick={onClose}>Понятно</button>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [history, setHistory] = useState(["home"]);
  const [governmentTab, setGovernmentTab] = useState("all");
  const [modal, setModal] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("kaspi-demo-screen");
    if (["home", "government", "document", "details"].includes(saved)) {
      setScreen(saved);
      setHistory([saved]);
    }
  }, []);

  function navigate(nextScreen) {
    if (nextScreen === "notice") {
      setModal("notice");
      return;
    }
    if (nextScreen === "present" || nextScreen === "share") {
      setModal(nextScreen);
      return;
    }
    setHistory((current) => [...current, nextScreen]);
    setScreen(nextScreen);
    localStorage.setItem("kaspi-demo-screen", nextScreen);
  }

  function goBack() {
    setHistory((current) => {
      const next = current.length > 1 ? current.slice(0, -1) : ["home"];
      const previous = next[next.length - 1];
      setScreen(previous);
      localStorage.setItem("kaspi-demo-screen", previous);
      return next;
    });
  }

  return (
    <main className="phone">
      {screen === "home" && <HomeScreen navigate={navigate} />}
      {screen === "government" && (
        <GovernmentScreen navigate={navigate} tab={governmentTab} setTab={setGovernmentTab} />
      )}
      {screen === "document" && <IdentityDocumentScreen navigate={navigate} />}
      {screen === "details" && <DetailsScreen navigate={navigate} />}
      {modal && <DemoModal type={modal} onClose={() => setModal("")} />}
    </main>
  );
}
