"use strict";

const STORAGE_KEY = "tradingLibraryManager.items.v1";
const SETTINGS_KEY = "tradingLibraryManager.settings.v1";
const DB_NAME = "tradingLibraryManager.files";
const DB_VERSION = 1;
const FILE_STORE = "files";
const APP_VERSION = "20260518smoothai1";
const JOURNAL_STORAGE_KEY = "tradingLibraryManager.journals.v1";
const ASSISTANT_SETTINGS_KEY = "tradingLibraryManager.assistantSettings.v1";
const INSIGHT_CACHE_KEY = "tradingLibraryManager.insightCache.v1";
const PIN_KEY = "tradingLibraryManager.pinHash.v1";
const BACKUP_VERSION = "1.0";

const categories = [
  "SMC",
  "ICT",
  "POI",
  "Order Block",
  "FVG",
  "BOS",
  "CHoCH",
  "Entry",
  "Risk Management",
  "Indikator",
  "Video",
  "Gambar Chart",
  "Dokumen",
  "PDF",
  "Markdown",
  "Word",
  "Jurnal Trading",
  "Psikologi",
  "Backtest"
];

const statuses = [
  "Belum dibaca",
  "Dipelajari",
  "Dipakai",
  "Perlu revisi",
  "Selesai"
];

const fileTypes = ["Semua", "Gambar", "Video", "PDF", "Word", "Markdown", "Kode", "Dokumen"];

const dom = {
  categoryPills: document.querySelector("#categoryPills"),
  statusPills: document.querySelector("#statusPills"),
  typePills: document.querySelector("#typePills"),
  mediaTypePills: document.querySelector("#mediaTypePills"),
  sortSelect: document.querySelector("#sortSelect"),
  collectionFilterInput: document.querySelector("#collectionFilterInput"),
  showArchivedInput: document.querySelector("#showArchivedInput"),
  searchInput: document.querySelector("#searchInput"),
  focusSearchBtn: document.querySelector("#focusSearchBtn"),
  openSidebarBtn: document.querySelector("#openSidebarBtn"),
  closeSidebarBtn: document.querySelector("#closeSidebarBtn"),
  sidebarBackdrop: document.querySelector("#sidebarBackdrop"),
  sideDrawer: document.querySelector("#sideDrawer"),
  sideNavButtons: document.querySelectorAll(".side-nav-button"),
  openFormBtn: document.querySelector("#openFormBtn"),
  emptyAddBtn: document.querySelector("#emptyAddBtn"),
  clearFiltersBtn: document.querySelector("#clearFiltersBtn"),
  selectModeBtn: document.querySelector("#selectModeBtn"),
  bulkDeleteBtn: document.querySelector("#bulkDeleteBtn"),
  cancelSelectBtn: document.querySelector("#cancelSelectBtn"),
  libraryGrid: document.querySelector("#libraryGrid"),
  codeGrid: document.querySelector("#codeGrid"),
  mediaGrid: document.querySelector("#mediaGrid"),
  libraryEmpty: document.querySelector("#libraryEmpty"),
  codeEmpty: document.querySelector("#codeEmpty"),
  mediaEmpty: document.querySelector("#mediaEmpty"),
  libraryCount: document.querySelector("#libraryCount"),
  codeCount: document.querySelector("#codeCount"),
  mediaCount: document.querySelector("#mediaCount"),
  dashboardGrid: document.querySelector("#dashboardGrid"),
  statusList: document.querySelector("#statusList"),
  statisticsViewContent: document.querySelector("#statisticsViewContent"),
  installBtn: document.querySelector("#installBtn"),
  exportAllBtn: document.querySelector("#exportAllBtn"),
  importBackupInput: document.querySelector("#importBackupInput"),
  setPinBtn: document.querySelector("#setPinBtn"),
  clearPinBtn: document.querySelector("#clearPinBtn"),
  journalCount: document.querySelector("#journalCount"),
  newJournalBtn: document.querySelector("#newJournalBtn"),
  journalForm: document.querySelector("#journalForm"),
  journalId: document.querySelector("#journalId"),
  journalDateInput: document.querySelector("#journalDateInput"),
  journalMarketInput: document.querySelector("#journalMarketInput"),
  journalTitleInput: document.querySelector("#journalTitleInput"),
  journalSetupInput: document.querySelector("#journalSetupInput"),
  journalResultInput: document.querySelector("#journalResultInput"),
  journalProfitInput: document.querySelector("#journalProfitInput"),
  journalLossInput: document.querySelector("#journalLossInput"),
  journalPlanInput: document.querySelector("#journalPlanInput"),
  journalEvaluationInput: document.querySelector("#journalEvaluationInput"),
  journalMistakesInput: document.querySelector("#journalMistakesInput"),
  journalLessonsInput: document.querySelector("#journalLessonsInput"),
  journalEmotionInput: document.querySelector("#journalEmotionInput"),
  journalFileInput: document.querySelector("#journalFileInput"),
  journalFileMeta: document.querySelector("#journalFileMeta"),
  journalMessage: document.querySelector("#journalMessage"),
  resetJournalBtn: document.querySelector("#resetJournalBtn"),
  journalList: document.querySelector("#journalList"),
  journalEmpty: document.querySelector("#journalEmpty"),
  aiProviderInput: document.querySelector("#aiProviderInput"),
  aiBaseUrlInput: document.querySelector("#aiBaseUrlInput"),
  geminiApiKeyInput: document.querySelector("#geminiApiKeyInput"),
  geminiModelInput: document.querySelector("#geminiModelInput"),
  saveGeminiKeyBtn: document.querySelector("#saveGeminiKeyBtn"),
  testGeminiBtn: document.querySelector("#testGeminiBtn"),
  clearGeminiKeyBtn: document.querySelector("#clearGeminiKeyBtn"),
  updateInsightBtn: document.querySelector("#updateInsightBtn"),
  clearInsightBtn: document.querySelector("#clearInsightBtn"),
  askAssistantBtn: document.querySelector("#askAssistantBtn"),
  assistantQuestionInput: document.querySelector("#assistantQuestionInput"),
  assistantAnswer: document.querySelector("#assistantAnswer"),
  assistantMessage: document.querySelector("#assistantMessage"),
  aiChatToggleBtn: document.querySelector("#aiChatToggleBtn"),
  aiChatPopup: document.querySelector("#aiChatPopup"),
  closeAiChatBtn: document.querySelector("#closeAiChatBtn"),
  aiPopupQuestionInput: document.querySelector("#aiPopupQuestionInput"),
  askAiPopupBtn: document.querySelector("#askAiPopupBtn"),
  aiPopupAnswer: document.querySelector("#aiPopupAnswer"),
  saveAiPopupMaterialBtn: document.querySelector("#saveAiPopupMaterialBtn"),
  insightBox: document.querySelector("#insightBox"),
  fullscreenAnalyzeBtn: document.querySelector("#fullscreenAnalyzeBtn"),
  fullscreenAnalysis: document.querySelector("#fullscreenAnalysis"),
  navButtons: document.querySelectorAll(".bottom-nav .nav-button"),
  views: {
    library: document.querySelector("#libraryView"),
    code: document.querySelector("#codeView"),
    media: document.querySelector("#mediaView"),
    journal: document.querySelector("#journalView"),
    assistant: document.querySelector("#assistantView"),
    statistics: document.querySelector("#statisticsView"),
    status: document.querySelector("#statusView")
  },
  dialog: document.querySelector("#itemDialog"),
  form: document.querySelector("#itemForm"),
  formMode: document.querySelector("#formMode"),
  closeFormBtn: document.querySelector("#closeFormBtn"),
  deleteCurrentBtn: document.querySelector("#deleteCurrentBtn"),
  itemId: document.querySelector("#itemId"),
  titleInput: document.querySelector("#titleInput"),
  typeInput: document.querySelector("#typeInput"),
  categoryInput: document.querySelector("#categoryInput"),
  statusInput: document.querySelector("#statusInput"),
  collectionInput: document.querySelector("#collectionInput"),
  tagsInput: document.querySelector("#tagsInput"),
  mediaUrlInput: document.querySelector("#mediaUrlInput"),
  fileInput: document.querySelector("#fileInput"),
  fileMeta: document.querySelector("#fileMeta"),
  formPreview: document.querySelector("#formPreview"),
  compressImageInput: document.querySelector("#compressImageInput"),
  notesInput: document.querySelector("#notesInput"),
  checklistInput: document.querySelector("#checklistInput"),
  codeInput: document.querySelector("#codeInput"),
  codeField: document.querySelector("#codeField"),
  formMessage: document.querySelector("#formMessage"),
  cardTemplate: document.querySelector("#cardTemplate"),
  documentDialog: document.querySelector("#documentDialog"),
  closeDocumentBtn: document.querySelector("#closeDocumentBtn"),
  documentTitle: document.querySelector("#documentTitle"),
  documentTypeLabel: document.querySelector("#documentTypeLabel"),
  documentFrame: document.querySelector("#documentFrame"),
  downloadDocumentBtn: document.querySelector("#downloadDocumentBtn"),
  openDocumentBtn: document.querySelector("#openDocumentBtn"),
  fullscreenDialog: document.querySelector("#fullscreenDialog"),
  fullscreenBackBtn: document.querySelector("#fullscreenBackBtn"),
  fullscreenCloseBtn: document.querySelector("#fullscreenCloseBtn"),
  fullscreenExitBtn: document.querySelector("#fullscreenExitBtn"),
  fullscreenPrevBtn: document.querySelector("#fullscreenPrevBtn"),
  fullscreenNextBtn: document.querySelector("#fullscreenNextBtn"),
  fullscreenTitle: document.querySelector("#fullscreenTitle"),
  fullscreenMeta: document.querySelector("#fullscreenMeta"),
  fullscreenStage: document.querySelector("#fullscreenStage")
};

const state = {
  items: [],
  journals: [],
  category: "Semua",
  status: "Semua",
  fileType: "Semua",
  mediaType: "Semua",
  query: "",
  collectionFilter: "",
  sort: "pinned-newest",
  showArchived: false,
  view: "library",
  pendingMedia: null,
  activeDocument: null,
  renderedObjectUrls: new Set(),
  previewObjectUrl: "",
  documentObjectUrl: "",
  documentObjectUrlFileId: "",
  fullscreenObjectUrl: "",
  fullscreenObjectUrlFileId: "",
  fullscreenFeedObjectUrls: new Set(),
  activeFullscreenItem: null,
  autoTitleFromFile: false,
  pendingJournalFiles: [],
  aiProvider: "gemini",
  aiBaseUrl: "",
  geminiApiKey: "",
  geminiModel: "gemini-2.0-flash",
  insightCache: null,
  selectMode: false,
  selectedIds: new Set(),
  touchStartX: 0,
  dbPromise: null,
  deferredInstallPrompt: null,
  viewerStatusChanged: false,
  journalOpenDate: "",
  journalOpenId: "",
  statsCalendarYear: null,
  statsCalendarMonth: null,
  lastBackAt: 0,
  gridLimits: {},
  itemsVersion: 0,
  filterCache: { key: "", items: null },
  aiPopupLastQuestion: "",
  aiPopupLastAnswer: ""
};

async function boot() {
  await requestPersistentStorage();
  await enforcePinLock();
  state.items = normalizeItems(loadItems());
  state.journals = normalizeJournals(loadJournals());
  loadAssistantSettings();
  loadSettings();
  fillSelect(dom.categoryInput, categories);
  fillSelect(dom.statusInput, statuses);
  renderPills();
  bindEvents();
  if (dom.journalDateInput && !dom.journalDateInput.value) dom.journalDateInput.value = new Date().toISOString().slice(0, 10);
  render();
  initBackGuard();
  await migrateLegacyFiles();
  registerServiceWorker();
}

function bindEvents() {
  const debouncedSearchRender = debounce(() => {
    state.query = dom.searchInput.value.trim();
    resetGridLimits();
    saveSettings();
    render();
  }, 220);

  const debouncedCollectionRender = debounce(() => {
    state.collectionFilter = dom.collectionFilterInput?.value.trim() || "";
    resetGridLimits();
    saveSettings();
    render();
  }, 220);

  dom.searchInput.addEventListener("input", () => {
    debouncedSearchRender();
  });

  dom.focusSearchBtn.addEventListener("click", () => {
    dom.searchInput.focus();
  });

  dom.openSidebarBtn?.addEventListener("click", openSidebar);
  dom.closeSidebarBtn?.addEventListener("click", closeSidebar);
  dom.sidebarBackdrop?.addEventListener("click", closeSidebar);
  dom.sideNavButtons?.forEach((button) => {
    button.addEventListener("click", () => {
      setView(button.dataset.view);
      closeSidebar();
    });
  });

  dom.openFormBtn.addEventListener("click", () => openForm());
  dom.emptyAddBtn.addEventListener("click", () => openForm());

  dom.clearFiltersBtn.addEventListener("click", () => {
    state.category = "Semua";
    state.status = "Semua";
    state.fileType = "Semua";
    state.mediaType = "Semua";
    state.collectionFilter = "";
    state.query = "";
    state.showArchived = false;
    resetGridLimits();
    dom.searchInput.value = "";
    if (dom.collectionFilterInput) dom.collectionFilterInput.value = "";
    if (dom.showArchivedInput) dom.showArchivedInput.checked = false;
    saveSettings();
    renderPills();
    render();
  });

  dom.sortSelect?.addEventListener("change", () => {
    state.sort = dom.sortSelect.value;
    resetGridLimits();
    saveSettings();
    render();
  });

  dom.collectionFilterInput?.addEventListener("input", () => {
    debouncedCollectionRender();
  });

  dom.showArchivedInput?.addEventListener("change", () => {
    state.showArchived = dom.showArchivedInput.checked;
    resetGridLimits();
    saveSettings();
    render();
  });

  dom.exportAllBtn?.addEventListener("click", exportBackup);
  dom.importBackupInput?.addEventListener("change", importBackup);
  dom.setPinBtn?.addEventListener("click", setLocalPin);
  dom.clearPinBtn?.addEventListener("click", clearLocalPin);
  dom.newJournalBtn?.addEventListener("click", resetJournalForm);
  dom.resetJournalBtn?.addEventListener("click", resetJournalForm);
  dom.journalForm?.addEventListener("submit", saveJournalForm);
  dom.journalFileInput?.addEventListener("change", handleJournalFilePick);
  dom.aiProviderInput?.addEventListener("change", () => {
    handleProviderChange();
    saveGeminiSettings(false);
  });
  dom.saveGeminiKeyBtn?.addEventListener("click", () => saveGeminiSettings(true));
  dom.clearGeminiKeyBtn?.addEventListener("click", clearGeminiSettings);
  dom.testGeminiBtn?.addEventListener("click", testGeminiConnection);
  dom.updateInsightBtn?.addEventListener("click", updateInsightCache);
  dom.clearInsightBtn?.addEventListener("click", clearInsightCache);
  dom.askAssistantBtn?.addEventListener("click", askAssistant);
  dom.aiChatToggleBtn?.addEventListener("click", toggleAiChatPopup);
  dom.closeAiChatBtn?.addEventListener("click", closeAiChatPopup);
  dom.askAiPopupBtn?.addEventListener("click", askAiPopup);
  dom.saveAiPopupMaterialBtn?.addEventListener("click", saveAiPopupAsMaterial);
  dom.aiPopupQuestionInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      askAiPopup();
    }
  });
  dom.fullscreenAnalyzeBtn?.addEventListener("click", analyzeActiveChart);
  document.addEventListener("click", closeOpenCardMenus);
  document.addEventListener("click", () => closeOpenFilterMenus());
  dom.selectModeBtn.addEventListener("click", enterSelectMode);
  dom.cancelSelectBtn.addEventListener("click", exitSelectMode);
  dom.bulkDeleteBtn.addEventListener("click", deleteSelectedItems);

  dom.navButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  dom.closeFormBtn.addEventListener("click", () => closeForm());

  dom.dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeForm();
  });

  dom.form.addEventListener("submit", saveForm);
  dom.titleInput.addEventListener("input", () => {
    state.autoTitleFromFile = false;
  });
  dom.deleteCurrentBtn.addEventListener("click", deleteCurrentItem);
  dom.typeInput.addEventListener("change", syncTypeFields);
  dom.mediaUrlInput.addEventListener("input", () => updatePreviewFromUrl());
  dom.fileInput.addEventListener("change", handleFilePick);
  dom.closeDocumentBtn.addEventListener("click", closeDocumentDialog);
  dom.downloadDocumentBtn.addEventListener("click", downloadActiveDocument);
  dom.openDocumentBtn.addEventListener("click", openActiveDocumentInNewTab);
  dom.fullscreenBackBtn.addEventListener("click", closeFullscreenViewer);
  dom.fullscreenCloseBtn.addEventListener("click", closeFullscreenViewer);
  dom.fullscreenExitBtn.addEventListener("click", closeFullscreenViewer);
  dom.fullscreenPrevBtn.addEventListener("click", () => showAdjacentImage(-1));
  dom.fullscreenNextBtn.addEventListener("click", () => showAdjacentImage(1));
  dom.fullscreenStage.addEventListener("touchstart", handleFullscreenTouchStart, { passive: true });
  dom.fullscreenStage.addEventListener("touchend", handleFullscreenTouchEnd, { passive: true });

  dom.documentDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeDocumentDialog();
  });

  dom.fullscreenDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeFullscreenViewer();
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.deferredInstallPrompt = event;
    dom.installBtn.hidden = false;
  });

  dom.installBtn.addEventListener("click", installApp);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOpenFilterMenus();
      closeSidebar();
    }
  });
}


function openSidebar() {
  if (!dom.sideDrawer || !dom.sidebarBackdrop) return;
  dom.sideDrawer.classList.add("is-open");
  dom.sideDrawer.setAttribute("aria-hidden", "false");
  dom.sidebarBackdrop.hidden = false;
  document.body.classList.add("sidebar-open");
}

function closeSidebar() {
  if (!dom.sideDrawer || !dom.sidebarBackdrop) return;
  dom.sideDrawer.classList.remove("is-open");
  dom.sideDrawer.setAttribute("aria-hidden", "true");
  dom.sidebarBackdrop.hidden = true;
  document.body.classList.remove("sidebar-open");
}

function initBackGuard() {
  try {
    if (!history.state?.tlm) history.replaceState({ tlm: true, view: state.view }, "", location.href);
    history.pushState({ tlm: true, guard: true, view: state.view }, "", location.href);
    window.addEventListener("popstate", handleAppBack);
  } catch {}
}

function handleAppBack() {
  if (closeTopLayerForBack()) {
    pushBackGuard();
    return;
  }
  if (state.view !== "library") {
    setView("library");
    pushBackGuard();
    return;
  }
  const now = Date.now();
  if (now - state.lastBackAt < 1600) {
    history.back();
    return;
  }
  state.lastBackAt = now;
  pushBackGuard();
}

function pushBackGuard() {
  try {
    history.pushState({ tlm: true, guard: true, view: state.view }, "", location.href);
  } catch {}
}

function closeTopLayerForBack() {
  if (dom.sideDrawer?.classList.contains("is-open")) { closeSidebar(); return true; }
  if (dom.fullscreenDialog?.open) { closeFullscreenViewer(); return true; }
  if (dom.dialog?.open) { closeForm(); return true; }
  if (dom.documentDialog?.open) { closeDocumentDialog(); return true; }
  if (dom.aiChatPopup && !dom.aiChatPopup.hidden) { closeAiChatPopup(); return true; }
  if (document.querySelector(".filter-menu:not([hidden])")) { closeOpenFilterMenus(); return true; }
  if (document.querySelector(".card-menu:not([hidden])")) { closeOpenCardMenus(); return true; }
  return false;
}

function loadItems() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveItems(items = state.items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map(cleanItemForStorage)));
  invalidateRenderCache();
  refreshInsightCache();
}

function cleanItemForStorage(item) {
  const {
    data,
    file,
    blob,
    objectUrl,
    textPreview,
    mediaData,
    documentText,
    ...metadata
  } = item;
  return metadata;
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    state.category = saved.category || "Semua";
    state.status = saved.status || "Semua";
    state.fileType = saved.fileType || "Semua";
    state.mediaType = saved.mediaType || "Semua";
    state.query = saved.query || "";
    state.collectionFilter = saved.collectionFilter || "";
    state.sort = saved.sort || "pinned-newest";
    state.showArchived = Boolean(saved.showArchived);
    state.view = saved.view === "code" ? "library" : (saved.view || "library");
    dom.searchInput.value = state.query;
    if (dom.collectionFilterInput) dom.collectionFilterInput.value = state.collectionFilter;
    if (dom.sortSelect) dom.sortSelect.value = state.sort;
    if (dom.showArchivedInput) dom.showArchivedInput.checked = state.showArchived;
    setView(state.view, false);
  } catch {
    setView("library", false);
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({
    category: state.category,
    status: state.status,
    fileType: state.fileType,
    mediaType: state.mediaType,
    query: state.query,
    collectionFilter: state.collectionFilter,
    sort: state.sort,
    showArchived: state.showArchived,
    view: state.view
  }));
}

function fillSelect(select, options) {
  select.innerHTML = "";
  options.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
}

function renderPills() {
  renderPillSet(dom.categoryPills, ["Semua", ...categories], state.category, (value) => {
    state.category = value;
    resetGridLimits();
    saveSettings();
    renderPills();
    render();
  });

  renderPillSet(dom.statusPills, ["Semua", ...statuses], state.status, (value) => {
    state.status = value;
    resetGridLimits();
    saveSettings();
    renderPills();
    render();
  });

  renderPillSet(dom.typePills, fileTypes, state.fileType, (value) => {
    state.fileType = value;
    resetGridLimits();
    saveSettings();
    renderPills();
    render();
  });

  renderPillSet(dom.mediaTypePills, fileTypes.filter((value) => value !== "Kode"), state.mediaType, (value) => {
    state.mediaType = value;
    resetGridLimits();
    saveSettings();
    renderPills();
    render();
  });
}

function renderPillSet(container, values, activeValue, onPick) {
  if (!container) return;
  container.replaceChildren();
  container.classList.add("filter-dropdown-row");

  const wrap = document.createElement("div");
  wrap.className = "filter-dropdown";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "filter-toggle-button";
  toggle.setAttribute("aria-expanded", "false");
  toggle.innerHTML = `<span>${escapeHtml(activeValue || "Semua")}</span><i aria-hidden="true"></i>`;

  const menu = document.createElement("div");
  menu.className = "filter-menu";
  menu.hidden = true;

  values.forEach((value) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `pill-button${value === activeValue ? " is-active" : ""}`;
    button.textContent = value;
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", String(value === activeValue));
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      onPick(value);
      closeOpenFilterMenus();
    });
    menu.append(button);
  });

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = menu.hidden;
    closeOpenFilterMenus(menu);
    menu.hidden = !willOpen;
    toggle.setAttribute("aria-expanded", String(willOpen));
  });

  wrap.append(toggle, menu);
  container.append(wrap);
}

function closeOpenFilterMenus(except = null) {
  document.querySelectorAll(".filter-menu:not([hidden])").forEach((menu) => {
    if (menu === except) return;
    menu.hidden = true;
    menu.parentElement?.querySelector(".filter-toggle-button")?.setAttribute("aria-expanded", "false");
  });
}

const GRID_BATCH_SIZE = 24;

function invalidateRenderCache(resetLimits = false) {
  state.itemsVersion += 1;
  state.filterCache = { key: "", items: null };
  if (resetLimits) resetGridLimits();
}

function resetGridLimits() {
  state.gridLimits = {};
}

function getGridKey(container) {
  return container?.id || "grid";
}

function setView(view, shouldRender = true) {
  state.view = ["library", "code", "media", "journal", "assistant", "statistics", "status"].includes(view) ? view : "library";
  Object.entries(dom.views).forEach(([key, section]) => {
    const isActive = key === state.view;
    section.hidden = !isActive;
    section.classList.toggle("is-active", isActive);
  });
  dom.navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
  dom.sideNavButtons?.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
  saveSettings();
  if (shouldRender) render();
}

function render() {
  revokeRenderedObjectUrls();
  const data = getRenderData();
  updateRenderCounters(data);
  renderActiveView(data);
  syncSelectControls();
}

function getRenderData() {
  const allMatches = getFilteredItems(state.items);
  const codeItems = allMatches.filter((item) => item.type === "Kode Indikator" || item.category === "Indikator");
  const mediaItems = allMatches
    .filter((item) => isMediaItem(item) || isDocumentItem(item))
    .filter((item) => state.mediaType === "Semua" || getItemFileType(item) === state.mediaType || (state.mediaType === "Dokumen" && isDocumentItem(item)));
  return { allMatches, codeItems, mediaItems };
}

function updateRenderCounters({ allMatches, codeItems, mediaItems }) {
  if (dom.libraryCount) dom.libraryCount.textContent = makeCount(allMatches.length);
  if (dom.codeCount) dom.codeCount.textContent = makeCount(codeItems.length);
  if (dom.mediaCount) dom.mediaCount.textContent = makeCount(mediaItems.length);
  if (dom.journalCount) dom.journalCount.textContent = `${state.journals.length} jurnal`;
}

function renderActiveView({ allMatches, codeItems, mediaItems }) {
  switch (state.view) {
    case "code":
      renderGrid(dom.codeGrid, codeItems);
      if (dom.codeEmpty) dom.codeEmpty.hidden = codeItems.length > 0;
      break;
    case "media":
      renderGrid(dom.mediaGrid, mediaItems);
      if (dom.mediaEmpty) dom.mediaEmpty.hidden = mediaItems.length > 0;
      break;
    case "journal":
      renderJournals();
      break;
    case "assistant":
      renderAssistantPanel();
      break;
    case "statistics":
      renderStatistics(allMatches);
      break;
    case "status":
      renderDashboard(allMatches);
      break;
    case "library":
    default:
      renderGrid(dom.libraryGrid, allMatches);
      if (dom.libraryEmpty) dom.libraryEmpty.hidden = allMatches.length > 0;
      break;
  }
}

function getFilteredItems(items) {
  const canCache = items === state.items;
  const cacheKey = canCache ? [
    state.itemsVersion,
    state.category,
    state.status,
    state.fileType,
    state.collectionFilter,
    state.query,
    state.sort,
    state.showArchived
  ].join("|") : "";

  if (canCache && state.filterCache.key === cacheKey && Array.isArray(state.filterCache.items)) {
    return state.filterCache.items;
  }

  const query = state.query.toLowerCase();
  const collectionQuery = state.collectionFilter.toLowerCase();
  const result = [...items]
    .filter((item) => state.showArchived || !item.archived)
    .filter((item) => state.category === "Semua" || item.category === state.category)
    .filter((item) => state.status === "Semua" || item.status === state.status)
    .filter((item) => state.fileType === "Semua" || getItemFileType(item) === state.fileType || (state.fileType === "Dokumen" && isDocumentItem(item)))
    .filter((item) => !collectionQuery || String(item.collection || "").toLowerCase().includes(collectionQuery))
    .filter((item) => {
      if (!query) return true;
      return [
        item.title,
        item.type,
        item.category,
        item.status,
        item.collection,
        item.notes,
        item.code,
        item.mediaName,
        item.mediaUrl,
        item.mediaType,
        item.documentType,
        item.mediaSize,
        item.uploadedAt,
        item.documentText,
        ...(item.tags || []),
        ...(item.checklist || []).map((entry) => entry.text)
      ].some((part) => String(part || "").toLowerCase().includes(query));
    })
    .sort(compareItems);

  if (canCache) state.filterCache = { key: cacheKey, items: result };
  return result;
}

function compareItems(a, b) {
  if (state.sort === "pinned-newest") {
    if (Boolean(a.favorite) !== Boolean(b.favorite)) return a.favorite ? -1 : 1;
    return dateValue(b.updatedAt || b.createdAt) - dateValue(a.updatedAt || a.createdAt);
  }
  if (state.sort === "newest") return dateValue(b.updatedAt || b.createdAt) - dateValue(a.updatedAt || a.createdAt);
  if (state.sort === "oldest") return dateValue(a.updatedAt || a.createdAt) - dateValue(b.updatedAt || b.createdAt);
  if (state.sort === "title-asc") return String(a.title || "").localeCompare(String(b.title || ""), "id");
  if (state.sort === "title-desc") return String(b.title || "").localeCompare(String(a.title || ""), "id");
  if (state.sort === "status") return String(a.status || "").localeCompare(String(b.status || ""), "id");
  return 0;
}

function dateValue(value) {
  const time = new Date(value || 0).getTime();
  return Number.isFinite(time) ? time : 0;
}

function renderGrid(container, items) {
  if (!container) return;
  container.replaceChildren();
  const gridKey = getGridKey(container);
  const currentLimit = state.gridLimits[gridKey] || GRID_BATCH_SIZE;
  const limit = Math.min(items.length, currentLimit);
  const fragment = document.createDocumentFragment();
  items.slice(0, limit).forEach((item) => fragment.append(createCard(item)));
  container.append(fragment);

  if (limit < items.length) {
    const loadMoreWrap = document.createElement("div");
    loadMoreWrap.className = "load-more-card";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ghost-button load-more-button";
    button.textContent = `Muat lagi ${Math.min(GRID_BATCH_SIZE, items.length - limit)} dari ${items.length - limit} item`;
    button.addEventListener("click", () => {
      state.gridLimits[gridKey] = limit + GRID_BATCH_SIZE;
      render();
    });
    loadMoreWrap.append(button);
    container.append(loadMoreWrap);
  }
}

function enterSelectMode() {
  state.selectMode = true;
  state.selectedIds.clear();
  render();
}

function exitSelectMode() {
  state.selectMode = false;
  state.selectedIds.clear();
  render();
}

function toggleSelectedItem(id, checked) {
  if (checked) {
    state.selectedIds.add(id);
  } else {
    state.selectedIds.delete(id);
  }
  syncSelectControls();
  const card = document.querySelector(`.library-card[data-id="${CSS.escape(id)}"]`);
  if (card) card.classList.toggle("is-selected", checked);
}

function syncSelectControls() {
  dom.selectModeBtn.hidden = state.selectMode;
  dom.bulkDeleteBtn.hidden = !state.selectMode;
  dom.cancelSelectBtn.hidden = !state.selectMode;
  dom.bulkDeleteBtn.disabled = state.selectedIds.size === 0;
  dom.bulkDeleteBtn.textContent = state.selectedIds.size
    ? `Hapus Terpilih (${state.selectedIds.size})`
    : "Hapus Terpilih";
}

async function deleteSelectedItems() {
  const ids = [...state.selectedIds];
  if (!ids.length) return;
  const confirmed = window.confirm(`Hapus ${ids.length} item terpilih?`);
  if (!confirmed) return;

  const selectedItems = state.items.filter((item) => ids.includes(item.id));
  try {
    await Promise.all(selectedItems.map((item) => item.fileId ? deleteFileRecord(item.fileId) : Promise.resolve()));
  } catch {
    window.alert("Sebagian file belum bisa dihapus dari IndexedDB.");
    return;
  }

  state.items = state.items.filter((item) => !ids.includes(item.id));
  saveItems();
  exitSelectMode();
}

function createCard(item) {
  const card = dom.cardTemplate.content.firstElementChild.cloneNode(true);
  const mediaSlot = card.querySelector(".media-slot");
  const actionButton = card.querySelector(".copy-action");
  const fileLine = card.querySelector(".file-line");
  const selectAction = card.querySelector(".select-action");
  const isDocument = isDocumentItem(item);
  const isViewable = canOpenFullscreen(item);
  const isMarkdown = isDocument && getDocumentType(item) === "Markdown";
  const fileMetaLine = getFileMetaLine(item);

  card.dataset.id = item.id;
  card.classList.toggle("has-code", Boolean(item.code));
  card.classList.toggle("has-file", Boolean(fileMetaLine));
  card.classList.toggle("has-document", isDocument);
  card.classList.toggle("has-viewer", isViewable);
  card.classList.toggle("has-markdown", isMarkdown);
  card.classList.toggle("is-selectable", state.selectMode);
  card.classList.toggle("is-selected", state.selectedIds.has(item.id));
  card.querySelector(".category-tag").textContent = item.category;
  card.querySelector(".status-tag").textContent = item.status;
  card.querySelector(".status-tag").dataset.status = item.status;
  card.querySelector(".card-title").textContent = item.title;
  card.querySelector(".card-meta").textContent = `${item.type} • ${formatDate(item.updatedAt || item.createdAt)}`;
  fileLine.textContent = fileMetaLine;
  renderCardTags(card.querySelector(".card-tags"), item);
  card.querySelector(".card-notes").textContent = item.notes || "Tidak ada catatan.";
  renderChecklistPreview(card.querySelector(".checklist-preview"), item);
  renderRevisionLine(card.querySelector(".revision-line"), item);
  const codePreview = card.querySelector(".code-preview");
  codePreview.textContent = isMarkdown ? "Markdown tersimpan di IndexedDB." : item.code || "";
  if (isMarkdown) populateMarkdownPreview(item, codePreview);

  renderMediaSlot(mediaSlot, item);

  const menuWrap = card.querySelector(".card-menu-wrap");
  const menuToggle = card.querySelector(".menu-toggle-action");
  const cardMenu = card.querySelector(".card-menu");
  const editAction = card.querySelector(".edit-action");
  const copyAction = card.querySelector(".copy-action");
  const pinAction = card.querySelector(".pin-action");
  const archiveAction = card.querySelector(".archive-action");
  const exportAction = card.querySelector(".export-action");
  const deleteAction = card.querySelector(".delete-action");

  selectAction.checked = state.selectedIds.has(item.id);
  selectAction.addEventListener("change", () => toggleSelectedItem(item.id, selectAction.checked));
  menuToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleCardMenu(cardMenu);
  });
  menuWrap?.addEventListener("click", (event) => event.stopPropagation());
  editAction?.addEventListener("click", () => openForm(item.id));
  pinAction.textContent = item.favorite ? "Unpin" : "Pin";
  pinAction?.addEventListener("click", () => toggleFavorite(item.id));
  archiveAction.textContent = item.archived ? "Pulihkan" : "Arsip";
  archiveAction?.addEventListener("click", () => toggleArchive(item.id));
  exportAction?.addEventListener("click", () => exportSingleItem(item.id));
  deleteAction?.addEventListener("click", () => deleteItem(item.id));
  if (isViewable) {
    copyAction.textContent = "Lihat";
    copyAction?.addEventListener("click", () => showFullscreenViewer(item));
  } else if (item.code) {
    copyAction.textContent = "Salin";
    copyAction?.addEventListener("click", () => copyCode(item, copyAction));
  } else {
    copyAction.hidden = true;
  }

  return card;
}

function renderMediaSlot(slot, item) {
  slot.replaceChildren();
  const source = getMediaSource(item);
  const mediaKind = item.mediaKind || inferMediaKind(item);
  slot.dataset.itemId = item.id;

  if (isDocumentItem(item)) {
    const fallback = document.createElement("div");
    fallback.className = "media-fallback document-fallback";
    fallback.textContent = getDocumentMark(item);
    fallback.addEventListener("click", () => showFullscreenViewer(item));
    slot.append(fallback, makeMediaLabel(getDocumentType(item)));
    return;
  }

  if (mediaKind === "image") {
    if (source) {
      renderImageSlot(slot, item, source);
    } else if (item.fileId) {
      renderLoadingSlot(slot, item);
      loadItemObjectUrl(item).then((url) => {
        if (slot.dataset.itemId === item.id && url) renderImageSlot(slot, item, url);
      }).catch(() => renderLoadingSlot(slot, item));
    } else {
      renderLoadingSlot(slot, item);
    }
    return;
  }

  if (mediaKind === "video") {
    renderVideoSlot(slot, item, source);
    return;
  }

  const fallback = document.createElement("div");
  fallback.className = "media-fallback";
  fallback.textContent = getFallbackMark(item);
  slot.append(fallback, makeMediaLabel(item.type.replace(" Pembelajaran", "")));
}

function renderImageSlot(slot, item, source) {
  slot.replaceChildren();
  const img = document.createElement("img");
  img.loading = "lazy";
  img.alt = item.title;
  img.src = source;
  img.addEventListener("click", () => showFullscreenViewer(item));
  slot.append(img, makeMediaLabel("Gambar"));
}

function renderVideoSlot(slot, item, source) {
  slot.replaceChildren();
  const button = document.createElement("button");
  button.type = "button";
  button.className = "media-fallback video-fallback";
  button.textContent = "▶";
  button.setAttribute("aria-label", `Buka video ${item.title || ""}`.trim());
  button.addEventListener("click", () => showFullscreenViewer(item));
  slot.append(button, makeMediaLabel("Video"));
}

function renderLoadingSlot(slot, item) {
  slot.replaceChildren();
  const fallback = document.createElement("div");
  fallback.className = "media-fallback";
  fallback.textContent = getFallbackMark(item);
  slot.append(fallback, makeMediaLabel("Memuat"));
}

function makeMediaLabel(text) {
  const label = document.createElement("span");
  label.className = "media-label";
  label.textContent = text;
  return label;
}

function getFallbackMark(item) {
  if (item.type === "Kode Indikator" || item.category === "Indikator") return "{ }";
  if (item.type === "Video Pembelajaran") return "▶";
  if (item.type === "Gambar Chart") return "▣";
  if (isDocumentItem(item)) return getDocumentMark(item);
  return "TL";
}

function getMediaSource(item) {
  return item.objectUrl || item.mediaUrl || "";
}

function inferMediaKind(item) {
  const source = getMediaSource(item).toLowerCase();
  if (item.type === "Gambar Chart" || item.category === "Gambar Chart") return "image";
  if (item.type === "Video Pembelajaran" || item.category === "Video") return "video";
  if (item.type === "Dokumen" || ["Dokumen", "PDF", "Markdown", "Word"].includes(item.category)) return "document";
  if (/\.(png|jpe?g|webp|gif|svg)(\?.*)?$/.test(source) || source.startsWith("data:image/")) return "image";
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/.test(source) || source.startsWith("data:video/")) return "video";
  if (/\.(md|pdf|docx?)(\?.*)?$/.test(source) || source.startsWith("data:application/pdf") || source.startsWith("data:text/markdown") || source.startsWith("data:text/plain") || source.startsWith("data:application/msword") || source.startsWith("data:application/vnd.openxmlformats-officedocument.wordprocessingml.document")) return "document";
  return "";
}

function renderDashboard(items) {
  const totals = {
    total: items.length,
    code: items.filter((item) => getItemFileType(item) === "Kode").length,
    image: items.filter((item) => getItemFileType(item) === "Gambar").length,
    video: items.filter((item) => getItemFileType(item) === "Video").length,
    pdf: items.filter((item) => getItemFileType(item) === "PDF").length,
    word: items.filter((item) => getItemFileType(item) === "Word").length,
    favorite: items.filter((item) => item.favorite).length,
    archived: state.items.filter((item) => item.archived).length,
    journal: state.journals.length
  };

  dom.dashboardGrid.replaceChildren(
    makeStatCard("Total", totals.total),
    makeStatCard("Kode", totals.code),
    makeStatCard("Gambar", totals.image),
    makeStatCard("Video", totals.video),
    makeStatCard("PDF", totals.pdf),
    makeStatCard("Word", totals.word),
    makeStatCard("Pin", totals.favorite),
    makeStatCard("Arsip", totals.archived),
    makeStatCard("Jurnal", totals.journal)
  );

  dom.statusList.replaceChildren();
  const max = Math.max(1, ...statuses.map((status) => items.filter((item) => item.status === status).length));
  statuses.forEach((status) => {
    const count = items.filter((item) => item.status === status).length;
    const row = document.createElement("div");
    row.className = "status-row";

    const top = document.createElement("div");
    top.className = "status-row-top";

    const name = document.createElement("span");
    name.textContent = status;

    const amount = document.createElement("strong");
    amount.textContent = makeCount(count);

    const track = document.createElement("div");
    track.className = "progress-track";

    const bar = document.createElement("div");
    bar.className = "progress-bar";
    bar.style.width = `${Math.round((count / max) * 100)}%`;

    top.append(name, amount);
    track.append(bar);
    row.append(top, track);
    dom.statusList.append(row);
  });
}

function makeStatCard(label, value) {
  const card = document.createElement("div");
  card.className = "stat-card";

  const title = document.createElement("span");
  title.textContent = label;

  const number = document.createElement("strong");
  number.textContent = value;

  card.append(title, number);
  return card;
}


function renderStatistics(items) {
  if (!dom.statisticsViewContent) return;
  const total = items.length;
  const totals = {
    video: items.filter((item) => getItemFileType(item) === "Video").length,
    pdf: items.filter((item) => getItemFileType(item) === "PDF").length,
    image: items.filter((item) => getItemFileType(item) === "Gambar").length,
    journal: state.journals.length
  };
  const unread = items.filter((item) => item.status === "Belum dibaca").length;
  const learned = items.filter((item) => ["Dipelajari", "Dipakai", "Selesai"].includes(item.status)).length;
  const used = items.filter((item) => item.status === "Dipakai").length;
  const videoWatched = items.filter((item) => getItemFileType(item) === "Video" && item.status !== "Belum dibaca").length;
  const pdfOpened = items.filter((item) => getItemFileType(item) === "PDF" && item.status !== "Belum dibaca").length;
  const progressPercent = total ? Math.round((learned / total) * 100) : 0;
  const videoPercent = totals.video ? Math.round((videoWatched / totals.video) * 100) : 0;
  const pdfPercent = totals.pdf ? Math.round((pdfOpened / totals.pdf) * 100) : 0;

  const journalStats = getJournalStatistics();
  const monthInfo = getCurrentMonthInfo();
  const calendarHtml = buildStatisticsCalendar(monthInfo.year, monthInfo.month);
  const performanceRing = journalStats.entryCount ? Math.round((journalStats.win / journalStats.entryCount) * 100) : 0;

  dom.statisticsViewContent.innerHTML = `
    <div class="stats-summary-grid">
      ${makeStatisticsCard("Total Materi", total, "stack")}
      ${makeStatisticsCard("Video", totals.video, "video")}
      ${makeStatisticsCard("PDF", totals.pdf, "pdf")}
      ${makeStatisticsCard("Gambar", totals.image, "image")}
      ${makeStatisticsCard("Jurnal", totals.journal, "journal")}
    </div>

    <div class="stats-progress-grid">
      ${makeProgressStat("Sudah dibaca", learned, progressPercent)}
      ${makeProgressStat("Belum dibaca", unread, total ? Math.round((unread / total) * 100) : 0)}
      ${makeProgressStat("Video ditonton", videoWatched, videoPercent)}
      ${makeProgressStat("PDF terbuka", pdfOpened, pdfPercent)}
    </div>

    <section class="stats-panel">
      <h3>Performa Jurnal Trading</h3>
      <div class="journal-performance-grid">
        ${makeJournalStat("Total Entry", journalStats.entryCount, "chart")}
        ${makeJournalStat("Win Rate", `${journalStats.winRate}%`, "target")}
        ${makeJournalStat("Win / Loss", `${journalStats.win} / ${journalStats.loss}`, "ratio")}
        ${makeJournalStat("BE / No Entry", `${journalStats.be} / ${journalStats.noEntry}`, "money")}
        ${makeJournalStat("Total Profit", formatTradeAmount(journalStats.totalProfit), "money")}
        ${makeJournalStat("Total Loss", formatTradeAmount(journalStats.totalLoss), "money")}
        ${makeJournalStat("Net P/L", formatTradeAmount(journalStats.netProfit), "target")}
      </div>
    </section>

    <section class="stats-panel calendar-panel">
      <div class="calendar-title calendar-title-with-nav">
        <button type="button" class="calendar-nav-button" data-stats-month-nav="-1" aria-label="Bulan sebelumnya">‹</button>
        <div>
          <h3>${monthInfo.label}</h3>
          <p>Monthly Journal • ${journalStats.monthJournalCount} jurnal</p>
        </div>
        <button type="button" class="calendar-nav-button" data-stats-month-nav="1" aria-label="Bulan berikutnya">›</button>
      </div>
      ${calendarHtml}
    </section>

    <div class="stats-lower-grid">
      <section class="stats-panel stat-donut-card">
        <h3>Performa Bulanan</h3>
        <div class="donut-wrap">
          <div class="donut-ring" style="--value:${performanceRing}"><strong>${performanceRing}%</strong><span>Win Rate</span></div>
          <div class="donut-legend">
            <span><i class="legend-profit"></i>Win ${journalStats.win}</span>
            <span><i class="legend-loss"></i>Loss ${journalStats.loss}</span>
            <span><i class="legend-neutral"></i>BE ${journalStats.be}</span>
          </div>
        </div>
      </section>

      <section class="stats-panel progress-learning-card">
        <h3>Progress Belajar</h3>
        <div class="learning-line"><span>Total Materi</span><strong>${total}</strong></div>
        <div class="learning-progress"><i style="width:${progressPercent}%"></i></div>
        <div class="learning-percent">${progressPercent}%</div>
        <div class="learning-list">
          <span>Sudah dibaca <strong>${learned}</strong></span>
          <span>Belum dibaca <strong>${unread}</strong></span>
          <span>Dipakai <strong>${used}</strong></span>
        </div>
      </section>
    </div>
  `;
  bindStatisticsCalendarEvents();
}

function makeStatisticsCard(label, value, type) {
  return `<article class="stats-card"><span class="stats-icon stats-icon-${type}"></span><p>${label}</p><strong>${value}</strong></article>`;
}

function makeProgressStat(label, value, percent) {
  const safePercent = Math.max(0, Math.min(100, Number(percent) || 0));
  return `<article class="progress-stat"><div class="mini-ring" style="--value:${safePercent}"><span>${safePercent}%</span></div><div><p>${label}</p><strong>${value}</strong></div></article>`;
}

function makeJournalStat(label, value, type) {
  return `<article class="journal-stat"><span class="journal-stat-icon journal-stat-${type}"></span><p>${label}</p><strong>${value}</strong></article>`;
}

function getJournalStatistics() {
  const monthInfo = getCurrentMonthInfo();
  const monthPrefix = `${monthInfo.year}-${String(monthInfo.month + 1).padStart(2, "0")}`;
  const monthJournals = state.journals.filter((journal) => String(journal.date || "").startsWith(monthPrefix));
  return {
    ...calculateJournalStats(monthJournals),
    monthJournalCount: monthJournals.length
  };
}

function calculateJournalStats(source = []) {
  const win = source.filter((journal) => journal.result === "Win").length;
  const loss = source.filter((journal) => journal.result === "Loss").length;
  const be = source.filter((journal) => journal.result === "BE").length;
  const noEntry = source.filter((journal) => journal.result === "Tidak entry").length;
  const entryCount = source.filter((journal) => journal.result !== "Tidak entry").length;
  const decided = win + loss;
  const totalProfit = source.reduce((sum, journal) => sum + parseTradeAmount(journal.profit), 0);
  const totalLoss = source.reduce((sum, journal) => sum + parseTradeAmount(journal.loss), 0);
  const netProfit = totalProfit - totalLoss;
  return {
    win,
    loss,
    be,
    noEntry,
    entryCount,
    winRate: decided ? Math.round((win / decided) * 100) : 0,
    totalProfit,
    totalLoss,
    netProfit,
    averageProfit: win ? totalProfit / win : 0,
    averageLoss: loss ? totalLoss / loss : 0
  };
}

function getCurrentMonthInfo() {
  const now = new Date();
  if (!Number.isInteger(state.statsCalendarYear)) state.statsCalendarYear = now.getFullYear();
  if (!Number.isInteger(state.statsCalendarMonth)) state.statsCalendarMonth = now.getMonth();
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return {
    year: state.statsCalendarYear,
    month: state.statsCalendarMonth,
    label: `${monthNames[state.statsCalendarMonth]} ${state.statsCalendarYear}`
  };
}

function shiftStatisticsMonth(offset) {
  const current = getCurrentMonthInfo();
  const next = new Date(current.year, current.month + offset, 1);
  state.statsCalendarYear = next.getFullYear();
  state.statsCalendarMonth = next.getMonth();
  renderStatistics(getFilteredItems(state.items));
}

function buildStatisticsCalendar(year, month) {
  const dayLabels = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MINGGUAN"];
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = first.getDay();
  const totalDays = last.getDate();
  const cells = [];
  for (let i = 0; i < startDay; i += 1) cells.push({ empty: true });
  for (let day = 1; day <= totalDays; day += 1) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const journals = state.journals.filter((journal) => journal.date === date);
    cells.push({ day, date, journals });
  }
  while (cells.length % 7 !== 0) cells.push({ empty: true });
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  const header = dayLabels.map((label) => `<div class="cal-head">${label}</div>`).join("");
  const rows = weeks.map((week) => {
    const win = week.flatMap((cell) => cell.journals || []).filter((journal) => journal.result === "Win").length;
    const loss = week.flatMap((cell) => cell.journals || []).filter((journal) => journal.result === "Loss").length;
    const weekClass = win > loss ? "is-win" : loss > win ? "is-loss" : "";
    const weekText = win || loss ? `${win}W / ${loss}L` : "No Trade";
    return week.map((cell) => makeCalendarCell(cell)).join("") + `<div class="cal-cell cal-week ${weekClass}">${weekText}</div>`;
  }).join("");
  return `<div class="statistics-calendar">${header}${rows}</div>`;
}

function makeCalendarCell(cell) {
  if (cell.empty) return `<div class="cal-cell is-empty"></div>`;
  const journals = cell.journals || [];
  const hasWin = journals.some((journal) => journal.result === "Win");
  const hasLoss = journals.some((journal) => journal.result === "Loss");
  const hasBe = journals.some((journal) => journal.result === "BE");
  const cls = hasWin ? "is-win" : hasLoss ? "is-loss" : hasBe ? "is-be" : "";
  const label = journals.length ? (journals.length > 1 ? `${journals.length} jurnal` : journals[0].result || "Jurnal") : "No Trade";
  if (!journals.length) return `<div class="cal-cell ${cls}"><strong>${cell.day}</strong><span>${label}</span></div>`;
  return `<button type="button" class="cal-cell ${cls} is-clickable" data-journal-date="${cell.date}"><strong>${cell.day}</strong><span>${label}</span></button>`;
}

function bindStatisticsCalendarEvents() {
  dom.statisticsViewContent?.querySelectorAll("[data-journal-date]").forEach((button) => {
    button.addEventListener("click", () => openJournalDate(button.dataset.journalDate));
  });
  dom.statisticsViewContent?.querySelectorAll("[data-stats-month-nav]").forEach((button) => {
    button.addEventListener("click", () => shiftStatisticsMonth(Number(button.dataset.statsMonthNav) || 0));
  });
}

function openJournalDate(date) {
  const journals = state.journals.filter((journal) => journal.date === date);
  if (!journals.length) return;
  state.journalOpenDate = date;
  state.journalOpenId = journals.length === 1 ? journals[0].id : "";
  setView("journal");
  render();
  requestAnimationFrame(() => {
    document.querySelector(`[data-journal-date-group="${CSS.escape(date)}"]`)?.scrollIntoView({ block: "start", behavior: "smooth" });
  });
}

function openForm(id = null) {
  const item = id ? state.items.find((entry) => entry.id === id) : null;
  resetForm();

  if (item) {
    dom.formMode.textContent = "Edit";
    dom.itemId.value = item.id;
    dom.titleInput.value = item.title;
    dom.typeInput.value = item.type;
    dom.categoryInput.value = item.category;
    dom.statusInput.value = item.status;
    dom.collectionInput.value = item.collection || "";
    dom.tagsInput.value = (item.tags || []).join(", ");
    dom.mediaUrlInput.value = item.mediaUrl || "";
    dom.notesInput.value = item.notes || "";
    dom.checklistInput.value = checklistToText(item.checklist || []);
    dom.codeInput.value = item.code || "";
    dom.deleteCurrentBtn.hidden = false;
    state.pendingMedia = null;
    updatePreviewForItem(item);
  } else {
    dom.formMode.textContent = "Tambah";
  }

  syncTypeFields();
  showDialog();
  requestAnimationFrame(() => dom.titleInput.focus());
}

function resetForm() {
  dom.form.reset();
  dom.itemId.value = "";
  dom.typeInput.value = "Materi Trading";
  dom.categoryInput.value = "SMC";
  dom.statusInput.value = "Belum dibaca";
  dom.fileMeta.textContent = "PNG, JPG, WEBP, MP4, WEBM, MD, DOC, DOCX, PDF";
  dom.compressImageInput.checked = false;
  dom.formMessage.textContent = "";
  dom.deleteCurrentBtn.hidden = true;
  state.pendingMedia = null;
  state.autoTitleFromFile = false;
  revokePreviewObjectUrl();
  clearPreview();
}

function showDialog() {
  if (typeof dom.dialog.showModal === "function") {
    dom.dialog.showModal();
  } else {
    dom.dialog.setAttribute("open", "");
  }
}

function closeForm() {
  if (dom.dialog.open && typeof dom.dialog.close === "function") {
    dom.dialog.close();
  } else {
    dom.dialog.removeAttribute("open");
  }
  resetForm();
}

function syncTypeFields() {
  const type = dom.typeInput.value;
  dom.codeField.hidden = type !== "Kode Indikator";

  if (type === "Kode Indikator") {
    dom.categoryInput.value = "Indikator";
  } else if (type === "Gambar Chart") {
    dom.categoryInput.value = "Gambar Chart";
  } else if (type === "Video Pembelajaran") {
    dom.categoryInput.value = "Video";
  } else if (type === "Dokumen" && !["Dokumen", "PDF", "Markdown", "Word"].includes(dom.categoryInput.value)) {
    dom.categoryInput.value = "Dokumen";
  }
}

async function handleFilePick() {
  const files = [...(dom.fileInput.files || [])];
  dom.formMessage.textContent = "";

  if (!files.length) {
    state.pendingMedia = null;
    state.autoTitleFromFile = false;
    revokePreviewObjectUrl();
    dom.fileMeta.textContent = "PNG, JPG, WEBP, MP4, WEBM, MD, DOC, DOCX, PDF";
    updatePreviewFromUrl();
    return;
  }

  try {
    const pendingFiles = [];
    for (const file of files) {
      const pending = await makePendingMedia(file, { compressImage: dom.compressImageInput?.checked });
      if (pending) pendingFiles.push(pending);
    }

    if (!pendingFiles.length) {
      state.pendingMedia = null;
      clearPreview();
      dom.formMessage.textContent = "Format file belum didukung.";
      return;
    }

    state.pendingMedia = pendingFiles[0];
    state.pendingMedia.files = pendingFiles;
    revokePreviewObjectUrl();
    state.previewObjectUrl = URL.createObjectURL(pendingFiles[0].file);
    pendingFiles[0].objectUrl = state.previewObjectUrl;
    dom.fileMeta.textContent = pendingFiles.length === 1
      ? `${pendingFiles[0].name} • ${formatBytes(pendingFiles[0].size)}`
      : `${pendingFiles.length} file dipilih`;
    if (!dom.itemId.value && !dom.titleInput.value.trim()) {
      dom.titleInput.value = pendingFiles.length === 1
        ? fileTitleFromName(pendingFiles[0].name)
        : `${pendingFiles.length} file dipilih`;
      state.autoTitleFromFile = true;
    }
    updatePreview(pendingFiles[0].objectUrl, pendingFiles[0].kind, pendingFiles[0]);
    applyPendingMediaType(pendingFiles[0]);
  } catch {
    state.pendingMedia = null;
    clearPreview();
    dom.formMessage.textContent = "File tidak bisa dibaca.";
  }
}

async function makePendingMedia(file, options = {}) {
  let workingFile = file;
  let compressed = false;
  if (options.compressImage && isImageFile(file) && file.size > 450 * 1024) {
    const compressedBlob = await compressImageFile(file).catch(() => null);
    if (compressedBlob && compressedBlob.size < file.size) {
      workingFile = new File([compressedBlob], file.name.replace(/\.[^.]+$/, ".webp"), { type: compressedBlob.type || "image/webp" });
      compressed = true;
    }
  }
  const fileHash = await hashBlob(workingFile).catch(() => `${workingFile.name}:${workingFile.size}:${workingFile.lastModified || 0}`);

  if (isImageFile(workingFile)) {
    return {
      file: workingFile,
      kind: "image",
      name: workingFile.name,
      type: workingFile.type || getMimeForFileExtension(workingFile.name) || "image/*",
      size: workingFile.size,
      objectUrl: "",
      fileHash,
      compressed,
      documentText: ""
    };
  }

  if (isVideoFile(workingFile)) {
    return {
      file: workingFile,
      kind: "video",
      name: workingFile.name,
      type: workingFile.type || getMimeForFileExtension(workingFile.name) || "video/*",
      size: workingFile.size,
      objectUrl: "",
      fileHash,
      compressed,
      documentText: ""
    };
  }

  if (isDocumentFile(workingFile)) {
    const documentType = getDocumentTypeFromFile(workingFile);
    const textPreview = documentType === "Markdown" ? await readAsText(workingFile) : "";
    const documentText = await extractDocumentTextFromBlob(workingFile, documentType).catch(() => textPreview || "");
    return {
      file: workingFile,
      kind: "document",
      name: workingFile.name,
      type: workingFile.type || getMimeForDocumentType(documentType),
      size: workingFile.size,
      objectUrl: "",
      documentType,
      textPreview,
      documentText,
      fileHash,
      compressed
    };
  }

  return null;
}

function applyPendingMediaType(pending) {
  if (pending.kind === "image") {
    if (dom.typeInput.value === "Materi Trading") dom.typeInput.value = "Gambar Chart";
  } else if (pending.kind === "video") {
    dom.typeInput.value = "Video Pembelajaran";
  } else if (pending.kind === "document") {
    dom.typeInput.value = "Dokumen";
    dom.categoryInput.value = getCategoryForDocumentType(pending.documentType);
  }
  syncTypeFields();
}

function updatePreviewFromUrl() {
  if (state.pendingMedia?.file) return;
  const url = dom.mediaUrlInput.value.trim();
  updatePreview(url, inferMediaKind({ mediaUrl: url, type: dom.typeInput.value, category: dom.categoryInput.value }), {
    mediaUrl: url,
    type: dom.typeInput.value,
    category: dom.categoryInput.value
  });
}

function updatePreview(source, kind, item = {}) {
  clearPreview();
  if (!source) return;

  const mediaKind = kind || inferMediaKind({ mediaUrl: source, type: dom.typeInput.value, category: dom.categoryInput.value });
  let media;

  if (mediaKind === "image") {
    media = document.createElement("img");
    media.alt = dom.titleInput.value || "Preview gambar";
  } else if (mediaKind === "video") {
    media = document.createElement("video");
    media.controls = true;
    media.playsInline = true;
    media.preload = "metadata";
  } else if (mediaKind === "document") {
    renderDocumentPreview(dom.formPreview, {
      ...item,
      objectUrl: source
    });
    dom.formPreview.hidden = false;
    return;
  } else {
    return;
  }

  media.src = source;
  dom.formPreview.append(media);
  dom.formPreview.hidden = false;
}

function clearPreview() {
  dom.formPreview.replaceChildren();
  dom.formPreview.hidden = true;
}

async function saveForm(event) {
  event.preventDefault();
  if (!dom.itemId.value && state.pendingMedia?.files?.length > 1) {
    await saveMultipleFileItems();
    return;
  }

  const id = dom.itemId.value || createId();
  const existing = state.items.find((item) => item.id === id);
  const now = new Date().toISOString();
  const mediaUrl = dom.mediaUrlInput.value.trim();
  const pending = state.pendingMedia;
  if (!existing && pending?.fileHash && findDuplicateByHash(pending.fileHash)) {
    dom.formMessage.textContent = "File duplikat terdeteksi. File ini sudah ada di library.";
    return;
  }
  const mediaUrlChanged = Boolean(existing) && mediaUrl !== (existing.mediaUrl || "");
  const keepExistingFile = Boolean(existing?.fileId) && !pending?.file && !(mediaUrlChanged && mediaUrl);
  const fileId = pending?.file ? createId() : keepExistingFile ? existing.fileId : "";
  const mediaKind = pending?.kind
    || (keepExistingFile ? existing?.mediaKind : "")
    || inferMediaKind({ mediaUrl, type: dom.typeInput.value, category: dom.categoryInput.value })
    || (!mediaUrlChanged ? existing?.mediaKind : "")
    || "";
  const mediaName = pending?.name
    || (keepExistingFile ? existing?.mediaName : "")
    || fileNameFromUrl(mediaUrl);
  const mediaType = pending?.type || (keepExistingFile ? existing?.mediaType : "");
  const mediaSize = pending?.size || (keepExistingFile ? existing?.mediaSize : 0) || 0;
  const documentType = pending?.documentType
    || (mediaKind === "document" ? getDocumentType({ mediaUrl, mediaName, mediaType, category: dom.categoryInput.value }) : "");
  const uploadedAt = pending?.file ? now : existing?.uploadedAt || now;

  const item = {
    id,
    title: dom.titleInput.value.trim(),
    type: dom.typeInput.value,
    category: dom.categoryInput.value,
    status: dom.statusInput.value,
    collection: dom.collectionInput.value.trim(),
    tags: parseTags(dom.tagsInput.value),
    notes: dom.notesInput.value.trim(),
    checklist: parseChecklistText(dom.checklistInput.value),
    code: dom.codeField.hidden ? "" : dom.codeInput.value.trim(),
    mediaUrl,
    fileId,
    mediaKind,
    mediaName,
    mediaType,
    mediaSize,
    documentType,
    documentText: pending?.documentText || existing?.documentText || "",
    fileHash: pending?.fileHash || existing?.fileHash || "",
    favorite: Boolean(existing?.favorite),
    archived: Boolean(existing?.archived),
    revisionHistory: buildRevisionHistory(existing, now),
    uploadedAt,
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };

  try {
    if (pending?.file) {
      await putFileRecord({
        id: fileId,
        itemId: id,
        blob: pending.file,
        name: mediaName,
        type: mediaType,
        size: mediaSize,
        kind: mediaKind,
        documentType,
        documentText: pending.documentText || "",
        fileHash: pending.fileHash || "",
        uploadedAt
      });
    }

    const nextItems = existing
      ? state.items.map((entry) => entry.id === id ? item : entry)
      : [item, ...state.items];

    saveItems(nextItems);
    state.items = nextItems;
    closeForm();
    render();

    if (existing?.fileId && existing.fileId !== fileId && (pending?.file || mediaUrlChanged)) {
      deleteFileRecord(existing.fileId).catch(() => {});
    }
  } catch {
    if (pending?.file && fileId) {
      deleteFileRecord(fileId).catch(() => {});
    }
    dom.formMessage.textContent = "File belum tersimpan. Ruang penyimpanan browser mungkin penuh.";
  }
}

async function saveMultipleFileItems() {
  const pendingFiles = state.pendingMedia?.files || [];
  const now = new Date().toISOString();
  const baseTitle = dom.titleInput.value.trim();
  const useFileNamesOnly = state.autoTitleFromFile;
  const notes = dom.notesInput.value.trim();
  const status = dom.statusInput.value;
  const mediaUrl = dom.mediaUrlInput.value.trim();
  const createdItems = [];
  const createdFileIds = [];

  try {
    for (const pending of pendingFiles) {
      if (pending.fileHash && findDuplicateByHash(pending.fileHash)) continue;
      const id = createId();
      const fileId = createId();
      const itemType = getTypeForPendingMedia(pending);
      const category = getCategoryForPendingMedia(pending);
      const documentType = pending.documentType || "";
      const item = {
        id,
        title: useFileNamesOnly ? fileTitleFromName(pending.name) : (baseTitle ? `${baseTitle} - ${pending.name}` : fileTitleFromName(pending.name)),
        type: itemType,
        category,
        status,
        collection: dom.collectionInput.value.trim(),
        tags: parseTags(dom.tagsInput.value),
        notes,
        checklist: parseChecklistText(dom.checklistInput.value),
        code: "",
        mediaUrl,
        fileId,
        mediaKind: pending.kind,
        mediaName: pending.name,
        mediaType: pending.type,
        mediaSize: pending.size,
        documentType,
        documentText: pending.documentText || "",
        fileHash: pending.fileHash || "",
        favorite: false,
        archived: false,
        revisionHistory: [],
        uploadedAt: now,
        createdAt: now,
        updatedAt: now
      };

      await putFileRecord({
        id: fileId,
        itemId: id,
        blob: pending.file,
        name: pending.name,
        type: pending.type,
        size: pending.size,
        kind: pending.kind,
        documentType,
        documentText: pending.documentText || "",
        fileHash: pending.fileHash || "",
        uploadedAt: now
      });

      createdFileIds.push(fileId);
      createdItems.push(item);
    }

    state.items = [...createdItems, ...state.items];
    saveItems();
    closeForm();
    render();
  } catch {
    await Promise.all(createdFileIds.map((fileId) => deleteFileRecord(fileId).catch(() => {})));
    dom.formMessage.textContent = "Sebagian file belum tersimpan. Ruang penyimpanan browser mungkin penuh.";
  }
}

function getTypeForPendingMedia(pending) {
  if (pending.kind === "image") return "Gambar Chart";
  if (pending.kind === "video") return "Video Pembelajaran";
  if (pending.kind === "document") return "Dokumen";
  return dom.typeInput.value;
}

function getCategoryForPendingMedia(pending) {
  if (pending.kind === "image") return "Gambar Chart";
  if (pending.kind === "video") return "Video";
  if (pending.kind === "document") return getCategoryForDocumentType(pending.documentType);
  return dom.categoryInput.value;
}

async function updatePreviewForItem(item) {
  const source = getMediaSource(item);
  if (source) {
    updatePreview(source, item.mediaKind || inferMediaKind(item), item);
    return;
  }

  if (!item.fileId) {
    clearPreview();
    return;
  }

  const url = await loadItemObjectUrl(item, "preview");
  if (url && dom.itemId.value === item.id) updatePreview(url, item.mediaKind || inferMediaKind(item), item);
}

async function deleteCurrentItem() {
  const id = dom.itemId.value;
  if (!id) return;
  const deleted = await deleteItem(id);
  if (deleted) closeForm();
}

async function deleteItem(id) {
  const item = state.items.find((entry) => entry.id === id);
  if (!item) return false;
  const confirmed = window.confirm(`Hapus "${item.title}"?`);
  if (!confirmed) return false;
  try {
    if (item.fileId) await deleteFileRecord(item.fileId);
  } catch {
    window.alert("File belum bisa dihapus dari IndexedDB.");
    return false;
  }
  state.items = state.items.filter((entry) => entry.id !== id);
  saveItems();
  render();
  return true;
}

async function copyCode(item, button) {
  if (!item.code) return;
  try {
    await navigator.clipboard.writeText(item.code);
    pulseButton(button, "Tersalin");
  } catch {
    pulseButton(button, "Gagal");
  }
}

async function showDocument(item) {
  await showFullscreenViewer(item);
}

async function showFullscreenViewer(item) {
  if (!canOpenFullscreen(item)) return;

  state.activeFullscreenItem = item;
  state.viewerStatusChanged = false;
  dom.fullscreenStage.classList.remove("is-reader-stage");
  dom.fullscreenTitle.textContent = item.title || getDocumentName(item) || "Preview";
  dom.fullscreenMeta.textContent = getFullscreenMeta(item);
  dom.fullscreenStage.replaceChildren(makeFullscreenLoading());

  if (typeof dom.fullscreenDialog.showModal === "function") {
    dom.fullscreenDialog.showModal();
  } else {
    dom.fullscreenDialog.setAttribute("open", "");
  }

  await renderFullscreenContent(item);
  updateFullscreenImageNav();
  updateFullscreenAnalyzeButton();
}

function closeFullscreenViewer() {
  const media = dom.fullscreenStage.querySelector("video, audio");
  if (media) media.pause();
  dom.fullscreenStage.replaceChildren();
  dom.fullscreenStage.classList.remove("is-reader-stage");
  if (dom.fullscreenAnalysis) { dom.fullscreenAnalysis.hidden = true; dom.fullscreenAnalysis.textContent = ""; }
  state.activeFullscreenItem = null;
  state.touchStartX = 0;
  revokeFullscreenObjectUrl();
  revokeFullscreenFeedObjectUrls();

  if (dom.fullscreenDialog.open && typeof dom.fullscreenDialog.close === "function") {
    dom.fullscreenDialog.close();
  } else {
    dom.fullscreenDialog.removeAttribute("open");
  }
  if (state.viewerStatusChanged) {
    state.viewerStatusChanged = false;
    render();
  }
}

async function renderFullscreenContent(item) {
  const mediaKind = item.mediaKind || inferMediaKind(item);
  const documentType = getDocumentType(item);

  if (mediaKind === "image") {
    const source = await getFullscreenSource(item);
    if (!source) return renderFullscreenError("Gambar belum bisa dimuat.");

    const image = document.createElement("img");
    image.className = "fullscreen-image";
    image.alt = item.title || "Preview gambar";
    image.src = source;
    dom.fullscreenStage.replaceChildren(image);
    setupImageCompletionTracking(item);
    return;
  }

  if (mediaKind === "video") {
    await renderVideoFeed(item);
    return;
  }

  if (documentType === "Markdown") {
    const article = document.createElement("article");
    article.className = "fullscreen-markdown";

    const pre = document.createElement("pre");
    try {
      pre.textContent = await readItemText(item) || "Markdown kosong.";
    } catch {
      pre.textContent = "Markdown belum bisa dimuat.";
    }

    article.append(pre);
    dom.fullscreenStage.classList.add("is-reader-stage");
    dom.fullscreenStage.replaceChildren(article);
    setupReadableCompletionTracking(article, item);
    return;
  }

  if (documentType === "PDF") {
    renderFullscreenDocumentSummary(item);
    return;
  }

  if (documentType === "Word") {
    await renderDocxReader(item);
    return;
  }

  renderFullscreenDocumentSummary(item);
}



function markItemCompleted(item) {
  if (!item?.id || String(item.id).includes(":")) return;
  const index = state.items.findIndex((entry) => entry.id === item.id);
  if (index < 0 || state.items[index].status === "Selesai") return;
  state.items[index] = { ...state.items[index], status: "Selesai", updatedAt: new Date().toISOString() };
  if (state.activeFullscreenItem?.id === item.id) state.activeFullscreenItem = state.items[index];
  state.viewerStatusChanged = true;
  saveItems();
}

function setupVideoCompletionTracking(video, item) {
  const complete = () => markItemCompleted(item);
  video.addEventListener("ended", complete);
  video.addEventListener("timeupdate", () => {
    if (video.duration && Number.isFinite(video.duration) && video.currentTime / video.duration >= 0.98) complete();
  });
}

function setupImageCompletionTracking(item) {
  const itemId = item?.id;
  window.setTimeout(() => {
    if (state.activeFullscreenItem?.id === itemId) markItemCompleted(item);
  }, 3500);
}

function setupReadableCompletionTracking(element, item) {
  if (!element) return;
  const completeIfRead = () => {
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 32) markItemCompleted(item);
  };
  element.addEventListener("scroll", completeIfRead, { passive: true });
  window.setTimeout(() => {
    if (element.scrollHeight <= element.clientHeight + 32) markItemCompleted(item);
  }, 3500);
  window.setTimeout(completeIfRead, 600);
}

function applyVideoThumbnail(video, source) {
  if (!video || !source) return;
  video.muted = true;
  video.preload = "metadata";
  let captured = false;
  const capture = () => {
    if (captured || !video.videoWidth || !video.videoHeight) return;
    try {
      captured = true;
      const canvas = document.createElement("canvas");
      const maxWidth = 480;
      const ratio = Math.min(1, maxWidth / video.videoWidth);
      canvas.width = Math.max(1, Math.round(video.videoWidth * ratio));
      canvas.height = Math.max(1, Math.round(video.videoHeight * ratio));
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      video.poster = canvas.toDataURL("image/jpeg", 0.72);
      video.currentTime = 0;
    } catch {
      captured = true;
    }
  };
  video.addEventListener("loadeddata", capture, { once: true });
  video.addEventListener("seeked", capture, { once: true });
  video.addEventListener("loadedmetadata", () => {
    try {
      if (Number.isFinite(video.duration) && video.duration > 0) video.currentTime = Math.min(0.6, video.duration * 0.05);
    } catch {}
  }, { once: true });
  window.setTimeout(capture, 1800);
}

function getVisibleVideoItems() {
  return getFilteredItems(state.items).filter((item) => (item.mediaKind || inferMediaKind(item)) === "video");
}

async function renderVideoFeed(activeItem) {
  const videoItems = getVisibleVideoItems();
  const items = videoItems.length ? videoItems : [activeItem];
  const feed = document.createElement("div");
  feed.className = "fullscreen-video-feed";

  for (const videoItem of items) {
    const panel = document.createElement("section");
    panel.className = "fullscreen-video-panel";
    panel.dataset.id = videoItem.id;

    const source = await getFullscreenFeedSource(videoItem);
    if (source) {
      const video = document.createElement("video");
      video.className = "fullscreen-video feed-video";
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.src = source;
      setupVideoCompletionTracking(video, videoItem);
      panel.append(video);
    } else {
      const error = document.createElement("div");
      error.className = "fullscreen-error";
      error.textContent = "Video belum bisa dimuat.";
      panel.append(error);
    }

    const caption = document.createElement("div");
    caption.className = "fullscreen-video-caption";
    caption.textContent = videoItem.title || videoItem.mediaName || "Video";
    panel.append(caption);
    feed.append(panel);
  }

  dom.fullscreenStage.replaceChildren(feed);

  const activePanel = feed.querySelector(`[data-id="${CSS.escape(activeItem.id)}"]`);
  if (activePanel) {
    requestAnimationFrame(() => {
      activePanel.scrollIntoView({ block: "start" });
      playVisibleFeedVideo(feed);
    });
  } else {
    playVisibleFeedVideo(feed);
  }

  feed.addEventListener("scroll", debounce(() => {
    playVisibleFeedVideo(feed);
  }, 120), { passive: true });
}

function playVisibleFeedVideo(feed) {
  const panels = [...feed.querySelectorAll(".fullscreen-video-panel")];
  if (!panels.length) return;

  const feedRect = feed.getBoundingClientRect();
  let activePanel = panels[0];
  let activeDistance = Infinity;

  panels.forEach((panel) => {
    const rect = panel.getBoundingClientRect();
    const distance = Math.abs(rect.top - feedRect.top);
    if (distance < activeDistance) {
      activeDistance = distance;
      activePanel = panel;
    }
  });

  panels.forEach((panel) => {
    const video = panel.querySelector("video");
    if (!video) return;
    if (panel === activePanel) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });

  const activeItem = state.items.find((item) => item.id === activePanel.dataset.id);
  if (activeItem) {
    state.activeFullscreenItem = activeItem;
    dom.fullscreenTitle.textContent = activeItem.title || "Video";
    dom.fullscreenMeta.textContent = getFullscreenMeta(activeItem);
  }
}

function debounce(callback, wait = 120) {
  let timeoutId = 0;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), wait);
  };
}

async function getFullscreenFeedSource(item) {
  const source = getMediaSource(item);
  if (source) return source;
  if (!item.fileId) return "";
  const record = await getFileRecord(item.fileId);
  if (!record?.blob) return "";
  const url = URL.createObjectURL(record.blob);
  state.fullscreenFeedObjectUrls.add(url);
  return url;
}

function revokeFullscreenFeedObjectUrls() {
  state.fullscreenFeedObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  state.fullscreenFeedObjectUrls.clear();
}

function getVisibleImageItems() {
  return getFilteredItems(state.items).filter((item) => (item.mediaKind || inferMediaKind(item)) === "image");
}

function updateFullscreenImageNav() {
  const item = state.activeFullscreenItem;
  const isImage = item && (item.mediaKind || inferMediaKind(item)) === "image";
  const imageItems = isImage ? getVisibleImageItems() : [];
  const canNavigate = imageItems.length > 1;
  dom.fullscreenPrevBtn.hidden = !canNavigate;
  dom.fullscreenNextBtn.hidden = !canNavigate;
}

async function showAdjacentImage(direction) {
  const current = state.activeFullscreenItem;
  if (!current || (current.mediaKind || inferMediaKind(current)) !== "image") return;
  const imageItems = getVisibleImageItems();
  if (imageItems.length < 2) return;
  const currentIndex = imageItems.findIndex((item) => item.id === current.id);
  const nextIndex = (currentIndex + direction + imageItems.length) % imageItems.length;
  const nextItem = imageItems[nextIndex];
  state.activeFullscreenItem = nextItem;
  dom.fullscreenTitle.textContent = nextItem.title || "Preview gambar";
  dom.fullscreenMeta.textContent = getFullscreenMeta(nextItem);
  dom.fullscreenStage.replaceChildren(makeFullscreenLoading());
  await renderFullscreenContent(nextItem);
  updateFullscreenImageNav();
  updateFullscreenAnalyzeButton();
}

function handleFullscreenTouchStart(event) {
  if (!event.changedTouches.length) return;
  state.touchStartX = event.changedTouches[0].clientX;
}

function handleFullscreenTouchEnd(event) {
  if (!event.changedTouches.length || !state.touchStartX) return;
  const deltaX = event.changedTouches[0].clientX - state.touchStartX;
  state.touchStartX = 0;
  if (Math.abs(deltaX) < 48) return;
  showAdjacentImage(deltaX < 0 ? 1 : -1);
}

async function getFullscreenSource(item) {
  const source = getMediaSource(item);
  if (source) return source;
  try {
    return await loadItemObjectUrl(item, "fullscreen");
  } catch {
    return "";
  }
}

function renderFullscreenDocumentSummary(item) {
  const summary = document.createElement("div");
  summary.className = "fullscreen-doc-summary";

  const mark = document.createElement("div");
  mark.className = "media-fallback document-fallback";
  mark.textContent = getDocumentMark(item);

  const title = document.createElement("h3");
  title.textContent = getDocumentName(item);

  const meta = document.createElement("p");
  meta.textContent = getFileMetaLine(item) || getDocumentType(item);

  const actions = document.createElement("div");
  actions.className = "fullscreen-doc-actions";

  const openButton = document.createElement("button");
  openButton.className = "primary-button";
  openButton.type = "button";
  openButton.textContent = "Buka";
  openButton.addEventListener("click", () => openFullscreenItemInNewTab(item));

  const downloadButton = document.createElement("button");
  downloadButton.className = "ghost-button";
  downloadButton.type = "button";
  downloadButton.textContent = "Download";
  downloadButton.addEventListener("click", () => downloadFullscreenItem(item));

  actions.append(downloadButton, openButton);
  summary.append(mark, title, meta, actions);
  dom.fullscreenStage.replaceChildren(summary);
}

function renderFullscreenError(message) {
  const box = document.createElement("div");
  box.className = "fullscreen-error";
  box.textContent = message;
  dom.fullscreenStage.replaceChildren(box);
}

function makeFullscreenLoading() {
  const loading = document.createElement("div");
  loading.className = "fullscreen-error";
  loading.textContent = "Memuat preview...";
  return loading;
}

async function openFullscreenItemInNewTab(item) {
  const popup = window.open("", "_blank");
  if (popup) popup.opener = null;
  const source = await getFullscreenSource(item);
  if (!source) {
    if (popup) popup.close();
    return;
  }
  if (popup) {
    popup.location.href = source;
  } else {
    window.open(source, "_blank", "noopener");
  }
}

async function downloadFullscreenItem(item) {
  const source = await getFullscreenSource(item);
  if (!source) return;

  const link = document.createElement("a");
  link.href = source;
  link.download = item.mediaName || getFallbackDocumentName(item);
  document.body.append(link);
  link.click();
  link.remove();
}

function closeDocumentDialog() {
  state.activeDocument = null;
  dom.documentFrame.replaceChildren();
  revokeDocumentObjectUrl();
  if (dom.documentDialog.open && typeof dom.documentDialog.close === "function") {
    dom.documentDialog.close();
  } else {
    dom.documentDialog.removeAttribute("open");
  }
}

async function openActiveDocumentInNewTab() {
  const item = state.activeDocument;
  if (!item) return;
  const popup = window.open("", "_blank");
  if (popup) popup.opener = null;
  const source = await getDocumentOpenSource(item);
  if (!source) {
    if (popup) popup.close();
    return;
  }
  if (popup) {
    popup.location.href = source;
  } else {
    window.open(source, "_blank", "noopener");
  }
}

async function downloadActiveDocument() {
  const item = state.activeDocument;
  if (!item) return;
  const source = await getDocumentOpenSource(item);
  if (!source) return;

  const link = document.createElement("a");
  link.href = source;
  link.download = item.mediaName || getFallbackDocumentName(item);
  document.body.append(link);
  link.click();
  link.remove();
}

async function getDocumentOpenSource(item) {
  const source = getMediaSource(item);
  if (source) return source;
  try {
    return await loadItemObjectUrl(item, "document");
  } catch {
    return "";
  }
}

async function renderDocumentPreview(container, item, expanded = false) {
  container.replaceChildren();
  const documentType = getDocumentType(item);
  const name = getDocumentName(item);

  if (documentType === "PDF") {
    const summary = document.createElement("div");
    summary.className = "document-summary";

    const mark = document.createElement("div");
    mark.className = "media-fallback document-fallback";
    mark.textContent = "PDF";

    const copy = document.createElement("div");
    copy.className = "document-summary-copy";

    const title = document.createElement("strong");
    title.textContent = name;

    const meta = document.createElement("span");
    meta.textContent = "PDF tersimpan • Reader dinonaktifkan";

    copy.append(title, meta);
    summary.append(mark, copy);
    container.append(summary);
    return;
  }

  if (documentType === "Markdown") {
    const preview = document.createElement("pre");
    preview.className = "document-text-preview";
    try {
      preview.textContent = item.textPreview || await readItemText(item) || "Markdown akan dibuka sebagai teks.";
    } catch {
      preview.textContent = "Markdown belum bisa dimuat.";
    }
    if (!expanded) preview.dataset.compact = "true";
    container.append(preview);
    return;
  }

  const summary = document.createElement("div");
  summary.className = "document-summary";

  const mark = document.createElement("div");
  mark.className = "media-fallback document-fallback";
  mark.textContent = getDocumentMark(item);

  const copy = document.createElement("div");
  copy.className = "document-summary-copy";

  const title = document.createElement("strong");
  title.textContent = name;

  const meta = document.createElement("span");
  meta.textContent = `${documentType} • ${item.mediaSize ? formatBytes(item.mediaSize) : "File dokumen"}`;

  copy.append(title, meta);
  summary.append(mark, copy);
  container.append(summary);
}

async function populateMarkdownPreview(item, preview) {
  try {
    const text = await readItemText(item);
    if (text) preview.textContent = text;
  } catch {
    preview.textContent = "Markdown belum bisa dimuat.";
  }
}

function isMediaItem(item) {
  return item.mediaKind === "image"
    || item.mediaKind === "video"
    || item.type === "Gambar Chart"
    || item.type === "Video Pembelajaran";
}

function canOpenFullscreen(item) {
  return isMediaItem(item) || isDocumentItem(item);
}

function getFullscreenMeta(item) {
  const mediaKind = item.mediaKind || inferMediaKind(item);
  if (mediaKind === "image") return "Gambar • Fullscreen";
  if (mediaKind === "video") return "Video • Fullscreen";
  if (isDocumentItem(item)) return `${getDocumentType(item)} • Fullscreen`;
  return "Preview";
}

function isImageFile(file) {
  return file.type.startsWith("image/")
    || ["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(getFileExtension(file.name));
}

function isVideoFile(file) {
  return file.type.startsWith("video/")
    || ["mp4", "webm", "ogg", "mov", "m4v"].includes(getFileExtension(file.name));
}

function isDocumentItem(item) {
  return item.mediaKind === "document"
    || item.type === "Dokumen"
    || ["Dokumen", "PDF", "Markdown", "Word"].includes(item.category);
}

function isDocumentFile(file) {
  const extension = getFileExtension(file.name);
  return ["md", "pdf", "doc", "docx"].includes(extension)
    || [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/markdown"
    ].includes(file.type);
}

function getDocumentType(item) {
  if (item.documentType) return item.documentType;
  if (item.category === "PDF") return "PDF";
  if (item.category === "Markdown") return "Markdown";
  if (item.category === "Word") return "Word";

  const source = `${item.mediaName || ""} ${item.mediaUrl || ""} ${item.mediaType || ""}`.toLowerCase();
  if (source.includes("application/pdf") || /\.pdf(?:$|[?#\s])/.test(source)) return "PDF";
  if (source.includes("text/markdown") || source.includes("text/plain") || /\.md(?:$|[?#\s])/.test(source)) return "Markdown";
  if (source.includes("application/msword") || source.includes("officedocument.wordprocessingml") || /\.docx?(?:$|[?#\s])/.test(source)) return "Word";
  return "Dokumen";
}

function getDocumentTypeFromFile(file) {
  return getDocumentType({
    mediaName: file.name,
    mediaType: file.type
  });
}

function getDocumentMark(item) {
  const documentType = getDocumentType(item);
  if (documentType === "PDF") return "PDF";
  if (documentType === "Markdown") return "MD";
  if (documentType === "Word") return "DOC";
  return "DOC";
}

function getCategoryForDocumentType(documentType) {
  if (["PDF", "Markdown", "Word"].includes(documentType)) return documentType;
  return "Dokumen";
}

function getMimeForDocumentType(documentType) {
  if (documentType === "PDF") return "application/pdf";
  if (documentType === "Markdown") return "text/markdown";
  if (documentType === "Word") return "application/msword";
  return "application/octet-stream";
}

function getMimeForFileExtension(name = "") {
  const mimeByExtension = {
    gif: "image/gif",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    m4v: "video/mp4",
    md: "text/markdown",
    mov: "video/quicktime",
    mp4: "video/mp4",
    ogg: "video/ogg",
    pdf: "application/pdf",
    png: "image/png",
    svg: "image/svg+xml",
    webm: "video/webm",
    webp: "image/webp",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  };
  return mimeByExtension[getFileExtension(name)] || "";
}

function getFallbackDocumentName(item) {
  const extension = getDocumentType(item) === "Markdown" ? "md" : getDocumentType(item).toLowerCase();
  return `${(item.title || "dokumen").replace(/[^\w-]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "dokumen"}.${extension}`;
}

function getDocumentName(item) {
  return item.mediaName || fileNameFromUrl(item.mediaUrl) || "Dokumen";
}

function getFileMetaLine(item) {
  const name = item.mediaName || fileNameFromUrl(item.mediaUrl);
  if (!name) return "";
  const type = isDocumentItem(item) ? getDocumentType(item) : item.mediaType || item.mediaKind || item.type;
  const size = item.mediaSize ? ` • ${formatBytes(item.mediaSize)}` : "";
  return `${name} • ${type}${size}`;
}

function getFileExtension(name = "") {
  return String(name).split(".").pop().toLowerCase();
}

function fileNameFromUrl(url = "") {
  try {
    const pathname = new URL(url).pathname;
    return decodeURIComponent(pathname.split("/").pop() || "");
  } catch {
    return String(url).split("/").pop() || "";
  }
}

function fileTitleFromName(name = "") {
  const withoutExtension = String(name).replace(/\.[^.]+$/, "");
  return withoutExtension.replace(/[-_]+/g, " ").trim() || "File baru";
}

function decodeTextDataUrl(source = "") {
  if (!source.startsWith("data:")) return "";
  const commaIndex = source.indexOf(",");
  if (commaIndex < 0) return "";
  const meta = source.slice(0, commaIndex);
  const payload = source.slice(commaIndex + 1);
  try {
    if (!meta.includes(";base64")) return decodeURIComponent(payload);
    const binary = atob(payload);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return "";
  }
}

function pulseButton(button, label) {
  const original = button.textContent;
  button.textContent = label;
  window.setTimeout(() => {
    button.textContent = original;
  }, 1200);
}

function readAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function openFileDb() {
  if (!("indexedDB" in window)) {
    return Promise.reject(new Error("IndexedDB tidak tersedia."));
  }

  if (state.dbPromise) return state.dbPromise;

  state.dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(FILE_STORE)) {
        db.createObjectStore(FILE_STORE, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return state.dbPromise;
}

async function withFileStore(mode, action) {
  const db = await openFileDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(FILE_STORE, mode);
    const store = transaction.objectStore(FILE_STORE);
    const request = action(store);
    let result;

    request.onsuccess = () => {
      result = request.result;
    };
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => resolve(result);
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function putFileRecord(record) {
  return withFileStore("readwrite", (store) => store.put(record));
}

function getFileRecord(fileId) {
  if (!fileId) return Promise.resolve(null);
  return withFileStore("readonly", (store) => store.get(fileId));
}

function deleteFileRecord(fileId) {
  if (!fileId) return Promise.resolve();
  return withFileStore("readwrite", (store) => store.delete(fileId));
}

async function loadItemObjectUrl(item, scope = "rendered") {
  const source = getMediaSource(item);
  if (source) return source;
  if (!item.fileId) return "";
  if (scope === "document" && state.documentObjectUrl && state.documentObjectUrlFileId === item.fileId) {
    return state.documentObjectUrl;
  }
  if (scope === "fullscreen" && state.fullscreenObjectUrl && state.fullscreenObjectUrlFileId === item.fileId) {
    return state.fullscreenObjectUrl;
  }

  const record = await getFileRecord(item.fileId);
  if (!record?.blob) return "";

  const url = URL.createObjectURL(record.blob);
  if (scope === "preview") {
    revokePreviewObjectUrl();
    state.previewObjectUrl = url;
  } else if (scope === "document") {
    revokeDocumentObjectUrl();
    state.documentObjectUrl = url;
    state.documentObjectUrlFileId = item.fileId;
  } else if (scope === "fullscreen") {
    revokeFullscreenObjectUrl();
    state.fullscreenObjectUrl = url;
    state.fullscreenObjectUrlFileId = item.fileId;
  } else {
    state.renderedObjectUrls.add(url);
  }
  return url;
}

function createPreviewObjectUrl(file) {
  revokePreviewObjectUrl();
  const url = URL.createObjectURL(file);
  state.previewObjectUrl = url;
  return url;
}

function revokePreviewObjectUrl() {
  if (!state.previewObjectUrl) return;
  URL.revokeObjectURL(state.previewObjectUrl);
  state.previewObjectUrl = "";
}

function revokeDocumentObjectUrl() {
  if (!state.documentObjectUrl) return;
  URL.revokeObjectURL(state.documentObjectUrl);
  state.documentObjectUrl = "";
  state.documentObjectUrlFileId = "";
}

function revokeFullscreenObjectUrl() {
  if (!state.fullscreenObjectUrl) return;
  URL.revokeObjectURL(state.fullscreenObjectUrl);
  state.fullscreenObjectUrl = "";
  state.fullscreenObjectUrlFileId = "";
}

function revokeRenderedObjectUrls() {
  state.renderedObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  state.renderedObjectUrls.clear();
}

async function readItemText(item) {
  if (item.documentText) return item.documentText;
  if (item.textPreview) return item.textPreview;
  if (item.file instanceof Blob) return item.file.text();
  if (item.fileId) {
    const record = await getFileRecord(item.fileId);
    return record?.blob ? record.blob.text() : "";
  }
  return decodeTextDataUrl(getMediaSource(item));
}

async function migrateLegacyFiles() {
  const needsMigration = state.items.some((item) => item.mediaData || item.documentText);
  if (!needsMigration) return;

  const migrated = [];
  try {
    for (const item of state.items) {
      if (!item.mediaData && !item.documentText) {
        migrated.push(cleanItemForStorage(item));
        continue;
      }

      const blob = item.mediaData
        ? dataUrlToBlob(item.mediaData)
        : new Blob([item.documentText], { type: "text/markdown;charset=utf-8" });
      const fileId = item.fileId || createId();
      const mediaKind = item.mediaKind
        || inferMediaKind({ ...item, mediaUrl: item.mediaData || item.mediaUrl })
        || (isDocumentItem(item) ? "document" : "");
      const mediaName = item.mediaName || getDocumentName(item);
      const mediaType = item.mediaType || blob.type || getMimeForDocumentType(item.documentType || getDocumentType(item));
      const mediaSize = item.mediaSize || blob.size;
      const uploadedAt = item.uploadedAt || item.updatedAt || item.createdAt || new Date().toISOString();

      await putFileRecord({
        id: fileId,
        itemId: item.id,
        blob,
        name: mediaName,
        type: mediaType,
        size: mediaSize,
        kind: mediaKind,
        documentType: item.documentType || (mediaKind === "document" ? getDocumentType({ ...item, mediaType }) : ""),
        documentText: item.documentText || "",
        fileHash: item.fileHash || "",
        uploadedAt
      });

      migrated.push(cleanItemForStorage({
        ...item,
        fileId,
        mediaKind,
        mediaName,
        mediaType,
        mediaSize,
        uploadedAt
      }));
    }

    state.items = migrated;
    saveItems();
    render();
  } catch {
    dom.formMessage.textContent = "Migrasi file lama ke IndexedDB belum berhasil.";
  }
}

function dataUrlToBlob(dataUrl) {
  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex < 0) return new Blob([]);

  const meta = dataUrl.slice(0, commaIndex);
  const payload = dataUrl.slice(commaIndex + 1);
  const mime = meta.match(/^data:([^;,]+)/)?.[1] || "application/octet-stream";

  if (meta.includes(";base64")) {
    const binary = atob(payload);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new Blob([bytes], { type: mime });
  }

  return new Blob([decodeURIComponent(payload)], { type: mime });
}

function makeCount(count) {
  return `${count} item`;
}

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `item-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function installApp() {
  if (!state.deferredInstallPrompt) return;
  state.deferredInstallPrompt.prompt();
  await state.deferredInstallPrompt.userChoice;
  state.deferredInstallPrompt = null;
  dom.installBtn.hidden = true;
}

function registerServiceWorker() {
  clearOldAppCaches().catch(() => {});
  if (!("serviceWorker" in navigator)) return;

  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`./service-worker.js?v=${APP_VERSION}`).then((registration) => {
      registration.update?.();
    }).catch(() => {
      // PWA tetap berjalan sebagai aplikasi web statis jika registrasi gagal.
    });
  });
}


function normalizeItems(items) {
  return items.map((item) => ({
    collection: "",
    tags: [],
    checklist: [],
    documentText: "",
    fileHash: "",
    favorite: false,
    archived: false,
    revisionHistory: [],
    ...item,
    tags: Array.isArray(item.tags) ? item.tags : parseTags(item.tags || ""),
    checklist: Array.isArray(item.checklist) ? item.checklist : parseChecklistText(item.checklist || ""),
    revisionHistory: Array.isArray(item.revisionHistory) ? item.revisionHistory : []
  }));
}

function getItemFileType(item) {
  if (item.type === "Kode Indikator" || item.category === "Indikator") return "Kode";
  const mediaKind = item.mediaKind || inferMediaKind(item);
  if (mediaKind === "image") return "Gambar";
  if (mediaKind === "video") return "Video";
  if (isDocumentItem(item)) {
    const type = getDocumentType(item);
    if (["PDF", "Word", "Markdown"].includes(type)) return type;
    return "Dokumen";
  }
  return "Dokumen";
}

function parseTags(value) {
  if (Array.isArray(value)) return value.map(String).map((tag) => tag.trim()).filter(Boolean);
  return String(value || "").split(/[#,]/).map((tag) => tag.trim()).filter(Boolean).slice(0, 12);
}

function parseChecklistText(value) {
  if (Array.isArray(value)) return value.map((entry) => ({ text: String(entry.text || entry).trim(), done: Boolean(entry.done) })).filter((entry) => entry.text);
  return String(value || "").split(/\n+/).map((line) => {
    const text = line.replace(/^\s*\[(x|X|✓)\]\s*/, "").replace(/^\s*\[\s\]\s*/, "").trim();
    return { text, done: /^\s*\[(x|X|✓)\]/.test(line) };
  }).filter((entry) => entry.text).slice(0, 40);
}

function checklistToText(checklist) {
  return (checklist || []).map((entry) => `${entry.done ? "[x]" : "[ ]"} ${entry.text}`).join("\n");
}

function renderCardTags(container, item) {
  if (!container) return;
  const parts = [];
  if (item.favorite) parts.push("📌 Pin");
  if (item.archived) parts.push("Arsip");
  if (item.collection) parts.push(`Folder: ${item.collection}`);
  parts.push(...(item.tags || []).map((tag) => `#${tag}`));
  container.textContent = parts.join("  ");
  container.hidden = !parts.length;
}

function renderChecklistPreview(container, item) {
  if (!container) return;
  const checklist = item.checklist || [];
  container.replaceChildren();
  if (!checklist.length) {
    container.hidden = true;
    return;
  }
  container.hidden = false;
  checklist.slice(0, 4).forEach((entry, index) => {
    const label = document.createElement("label");
    label.className = "mini-check";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(entry.done);
    checkbox.addEventListener("change", () => updateChecklistState(item.id, index, checkbox.checked));
    const span = document.createElement("span");
    span.textContent = entry.text;
    label.append(checkbox, span);
    container.append(label);
  });
  if (checklist.length > 4) {
    const more = document.createElement("span");
    more.className = "check-more";
    more.textContent = `+${checklist.length - 4} checklist lain`;
    container.append(more);
  }
}

function renderRevisionLine(container, item) {
  if (!container) return;
  const count = item.revisionHistory?.length || 0;
  container.textContent = count ? `${count} catatan revisi` : "";
  container.hidden = !count;
}

function updateChecklistState(itemId, index, done) {
  state.items = state.items.map((item) => {
    if (item.id !== itemId) return item;
    const checklist = [...(item.checklist || [])];
    if (!checklist[index]) return item;
    checklist[index] = { ...checklist[index], done };
    return { ...item, checklist, updatedAt: new Date().toISOString() };
  });
  saveItems();
  render();
}

function buildRevisionHistory(existing, now) {
  const history = Array.isArray(existing?.revisionHistory) ? [...existing.revisionHistory] : [];
  if (!existing) return history;
  const changes = [];
  const watched = ["title", "status", "notes", "code", "collection"];
  const current = {
    title: dom.titleInput.value.trim(),
    status: dom.statusInput.value,
    notes: dom.notesInput.value.trim(),
    code: dom.codeField.hidden ? "" : dom.codeInput.value.trim(),
    collection: dom.collectionInput.value.trim()
  };
  watched.forEach((key) => {
    if (String(existing[key] || "") !== String(current[key] || "")) changes.push(key);
  });
  if (changes.length) history.unshift({ at: now, changes });
  return history.slice(0, 30);
}

function toggleFavorite(id) {
  state.items = state.items.map((item) => item.id === id ? { ...item, favorite: !item.favorite, updatedAt: new Date().toISOString() } : item);
  saveItems();
  render();
}

function toggleArchive(id) {
  state.items = state.items.map((item) => item.id === id ? { ...item, archived: !item.archived, updatedAt: new Date().toISOString() } : item);
  saveItems();
  render();
}

function findDuplicateByHash(fileHash) {
  if (!fileHash) return null;
  return state.items.find((item) => item.fileHash && item.fileHash === fileHash);
}

async function hashBlob(blob) {
  if (!globalThis.crypto?.subtle) return "";
  const buffer = await blob.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function compressImageFile(file) {
  const bitmap = await createImageBitmap(file);
  const maxSide = 1800;
  const ratio = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * ratio));
  canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/webp", 0.82));
}

async function extractDocumentTextFromBlob(blob, documentType) {
  if (documentType === "Markdown") return blob.text();
  if (documentType === "Word") return extractDocxText(blob);
  if (documentType === "PDF") return extractPdfText(blob);
  return "";
}

async function extractDocxText(blob) {
  if (!window.JSZip) return "";
  const zip = await window.JSZip.loadAsync(await blob.arrayBuffer());
  const xml = await zip.file("word/document.xml")?.async("string");
  if (!xml) return "";
  return xml
    .replace(/<w:tab\/>/g, "\t")
    .replace(/<w:br\/>/g, "\n")
    .replace(/<\/w:p>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function extractDocxHtml(blob) {
  if (!window.JSZip) return "";
  const zip = await window.JSZip.loadAsync(await blob.arrayBuffer());
  const xml = await zip.file("word/document.xml")?.async("string");
  if (!xml) return "";
  const paragraphs = xml.split(/<w:p[\s>]/).slice(1).map((chunk) => {
    const text = chunk
      .replace(/<w:tab\/>/g, "\t")
      .replace(/<w:br\/>/g, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
      .trim();
    return text ? `<p>${escapeHtml(text)}</p>` : "";
  }).filter(Boolean);
  return paragraphs.join("") || `<pre>${escapeHtml(await extractDocxText(blob))}</pre>`;
}

async function extractPdfText(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let latin = "";
  const max = Math.min(bytes.length, 3_000_000);
  for (let i = 0; i < max; i += 1) latin += String.fromCharCode(bytes[i]);
  const parts = [];
  const literalRe = /\((?:\\.|[^\\()])*\)\s*T[Jj]/g;
  let match;
  while ((match = literalRe.exec(latin)) && parts.length < 2000) {
    parts.push(decodePdfLiteral(match[0].replace(/\)\s*T[Jj]$/, "").slice(1)));
  }
  const arrayRe = /\[((?:\s*\((?:\\.|[^\\()])*\)\s*)+)\]\s*TJ/g;
  while ((match = arrayRe.exec(latin)) && parts.length < 3000) {
    const inside = match[1];
    const strings = inside.match(/\((?:\\.|[^\\()])*\)/g) || [];
    parts.push(strings.map((str) => decodePdfLiteral(str.slice(1, -1))).join(""));
  }
  return parts.join(" ").replace(/\s{2,}/g, " ").trim();
}

function decodePdfLiteral(value) {
  return value
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\b/g, "\b")
    .replace(/\\f/g, "\f")
    .replace(/\\([()\\])/g, "$1")
    .replace(/\\([0-7]{1,3})/g, (_, octal) => String.fromCharCode(parseInt(octal, 8)));
}

async function getFileBlob(item) {
  if (item.file instanceof Blob) return item.file;
  if (item.fileId) {
    const record = await getFileRecord(item.fileId);
    return record?.blob || null;
  }
  const source = getMediaSource(item);
  if (source?.startsWith("data:")) return dataUrlToBlob(source);
  return null;
}

async function renderDocxReader(item) {
  const shell = document.createElement("article");
  shell.className = "offline-reader docx-reader";
  const title = document.createElement("h3");
  title.textContent = getDocumentName(item);
  const blob = await getFileBlob(item);
  if (!blob) return renderFullscreenError("Word belum bisa dimuat.");
  try {
    const html = await extractDocxHtml(blob);
    const body = document.createElement("div");
    body.className = "docx-body";
    body.innerHTML = html || `<pre>${escapeHtml(item.documentText || "Word kosong.")}</pre>`;
    shell.append(title, body);
  } catch {
    const pre = document.createElement("pre");
    pre.textContent = item.documentText || "Word belum bisa dibaca di perangkat ini.";
    shell.append(title, pre);
  }
  dom.fullscreenStage.classList.add("is-reader-stage");
  dom.fullscreenStage.replaceChildren(shell);
  setupReadableCompletionTracking(shell, item);
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

async function exportBackup() {
  if (!window.JSZip) return window.alert("JSZip belum termuat.");
  try {
    const zip = new window.JSZip();
    zip.file("data.json", JSON.stringify({ version: BACKUP_VERSION, exportedAt: new Date().toISOString(), items: state.items, journals: state.journals, insightCache: state.insightCache }, null, 2));
    const folder = zip.folder("files");
    for (const item of state.items) {
      if (!item.fileId) continue;
      const record = await getFileRecord(item.fileId).catch(() => null);
      if (record?.blob) folder.file(`${item.fileId}-${sanitizeFileName(record.name || item.mediaName || "file")}`, record.blob);
    }
    for (const journal of state.journals) {
      for (const attachment of journal.attachments || []) {
        if (!attachment.fileId) continue;
        const record = await getFileRecord(attachment.fileId).catch(() => null);
        if (record?.blob) folder.file(`${attachment.fileId}-${sanitizeFileName(record.name || attachment.name || "file")}`, record.blob);
      }
    }
    const blob = await zip.generateAsync({ type: "blob" });
    await downloadBlob(blob, `trading-library-backup-${new Date().toISOString().slice(0, 10)}.zip`);
  } catch {
    window.alert("Backup gagal dibuat. Cek izin penyimpanan atau ruang perangkat.");
  }
}

async function exportSingleItem(id) {
  if (!window.JSZip) return window.alert("JSZip belum termuat.");
  const item = state.items.find((entry) => entry.id === id);
  if (!item) return;
  const zip = new window.JSZip();
  zip.file("data.json", JSON.stringify({ version: BACKUP_VERSION, exportedAt: new Date().toISOString(), items: [item] }, null, 2));
  if (item.fileId) {
    const record = await getFileRecord(item.fileId).catch(() => null);
    if (record?.blob) zip.folder("files").file(`${item.fileId}-${sanitizeFileName(record.name || item.mediaName || "file")}`, record.blob);
  }
  const blob = await zip.generateAsync({ type: "blob" });
  await downloadBlob(blob, `${sanitizeFileName(item.title || "item")}.zip`);
}

async function importBackup(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file || !window.JSZip) return;
  try {
    const zip = await window.JSZip.loadAsync(file);
    const payload = JSON.parse(await zip.file("data.json").async("string"));
    const incomingItems = normalizeItems(payload.items || []);
    const incomingJournals = normalizeJournals(payload.journals || []);
    const existingById = new Map(state.items.map((item) => [item.id, item]));
    for (const item of incomingItems) existingById.set(item.id, item);
    for (const item of incomingItems) {
      if (!item.fileId) continue;
      const fileEntry = Object.values(zip.files).find((entry) => !entry.dir && entry.name.startsWith(`files/${item.fileId}-`));
      if (!fileEntry) continue;
      const blob = await fileEntry.async("blob");
      await putFileRecord({
        id: item.fileId,
        itemId: item.id,
        blob,
        name: item.mediaName || fileEntry.name.split("-").slice(1).join("-") || "file",
        type: item.mediaType || blob.type || getMimeForFileExtension(item.mediaName),
        size: item.mediaSize || blob.size,
        kind: item.mediaKind || inferMediaKind(item),
        documentType: item.documentType || (isDocumentItem(item) ? getDocumentType(item) : ""),
        documentText: item.documentText || "",
        fileHash: item.fileHash || "",
        uploadedAt: item.uploadedAt || new Date().toISOString()
      });
    }
    const existingJournalsById = new Map(state.journals.map((journal) => [journal.id, journal]));
    for (const journal of incomingJournals) existingJournalsById.set(journal.id, journal);
    for (const journal of incomingJournals) {
      for (const attachment of journal.attachments || []) {
        if (!attachment.fileId) continue;
        const fileEntry = Object.values(zip.files).find((entry) => !entry.dir && entry.name.startsWith(`files/${attachment.fileId}-`));
        if (!fileEntry) continue;
        const blob = await fileEntry.async("blob");
        await putFileRecord({
          id: attachment.fileId,
          itemId: journal.id,
          blob,
          name: attachment.name || fileEntry.name.split("-").slice(1).join("-") || "file",
          type: attachment.type || blob.type || getMimeForFileExtension(attachment.name),
          size: attachment.size || blob.size,
          kind: attachment.kind || inferMediaKind({ mediaName: attachment.name, mediaType: attachment.type }),
          documentType: attachment.documentType || "",
          documentText: attachment.documentText || "",
          uploadedAt: attachment.uploadedAt || new Date().toISOString()
        });
      }
    }
    state.items = [...existingById.values()];
    state.journals = [...existingJournalsById.values()];
    state.insightCache = payload.insightCache || state.insightCache;
    saveItems();
    saveJournals();
    saveInsightCache();
    render();
    window.alert("Restore selesai.");
  } catch {
    window.alert("Backup belum bisa dibaca.");
  }
}

async function downloadBlob(blob, filename) {
  const file = new File([blob], filename, { type: blob.type || "application/zip" });
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: filename });
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 3000);
}

function sanitizeFileName(value) {
  return String(value || "file").replace(/[^a-z0-9._-]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 90) || "file";
}

async function setLocalPin() {
  const pin = window.prompt("Masukkan PIN baru minimal 4 angka:");
  if (!pin) return;
  if (!/^\d{4,}$/.test(pin)) return window.alert("PIN minimal 4 angka.");
  localStorage.setItem(PIN_KEY, await hashText(pin));
  window.alert("PIN aktif.");
}

async function clearLocalPin() {
  if (!localStorage.getItem(PIN_KEY)) return;
  const pin = window.prompt("Masukkan PIN lama untuk menghapus:");
  if (!pin) return;
  if (await hashText(pin) !== localStorage.getItem(PIN_KEY)) return window.alert("PIN salah.");
  localStorage.removeItem(PIN_KEY);
  window.alert("PIN dihapus.");
}

async function enforcePinLock() {
  const savedHash = localStorage.getItem(PIN_KEY);
  if (!savedHash) return;
  document.body.append(makeLockOverlay());
  return new Promise((resolve) => {
    const input = document.querySelector("#pinUnlockInput");
    const message = document.querySelector("#pinUnlockMessage");
    const button = document.querySelector("#pinUnlockBtn");
    const unlock = async () => {
      if (await hashText(input.value) === savedHash) {
        document.querySelector(".pin-lock")?.remove();
        resolve();
      } else {
        message.textContent = "PIN salah.";
        input.value = "";
        input.focus();
      }
    };
    button.addEventListener("click", unlock);
    input.addEventListener("keydown", (event) => { if (event.key === "Enter") unlock(); });
    input.focus();
  });
}

function makeLockOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "pin-lock";
  overlay.innerHTML = `
    <div class="pin-card">
      <div class="brand-mark">TL</div>
      <h2>Masukkan PIN</h2>
      <input id="pinUnlockInput" type="password" inputmode="numeric" autocomplete="current-password" placeholder="PIN">
      <button id="pinUnlockBtn" class="primary-button" type="button">Buka</button>
      <p id="pinUnlockMessage"></p>
    </div>`;
  return overlay;
}

async function hashText(value) {
  if (!globalThis.crypto?.subtle) return btoa(value);
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function requestPersistentStorage() {
  try {
    if (navigator.storage?.persist) await navigator.storage.persist();
  } catch {}
}

async function clearOldAppCaches() {
  if (!("caches" in window)) return;
  const keys = await caches.keys();
  await Promise.all(keys.filter((key) => key.startsWith("trading-library-manager-") && !key.endsWith(APP_VERSION)).map((key) => caches.delete(key)));
}


function toggleCardMenu(menu) {
  if (!menu) return;
  const willOpen = menu.hidden;
  closeOpenCardMenus();
  menu.hidden = !willOpen;
}

function closeOpenCardMenus() {
  document.querySelectorAll(".card-menu:not([hidden])").forEach((menu) => {
    menu.hidden = true;
  });
}

function loadJournals() {
  try {
    const parsed = JSON.parse(localStorage.getItem(JOURNAL_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveJournals(journals = state.journals) {
  localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(journals));
  refreshInsightCache();
}

function normalizeJournals(journals) {
  return (journals || []).map((journal) => ({
    id: createId(),
    date: new Date().toISOString().slice(0, 10),
    title: "Jurnal Trading",
    market: "",
    setup: "",
    result: "Belum selesai",
    profit: 0,
    loss: 0,
    plan: "",
    evaluation: "",
    mistakes: "",
    lessons: "",
    emotion: "",
    attachments: [],
    revisionHistory: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...journal,
    attachments: Array.isArray(journal.attachments) ? journal.attachments : [],
    revisionHistory: Array.isArray(journal.revisionHistory) ? journal.revisionHistory : []
  }));
}

function resetJournalForm() {
  if (!dom.journalForm) return;
  dom.journalForm.reset();
  dom.journalId.value = "";
  dom.journalDateInput.value = new Date().toISOString().slice(0, 10);
  dom.journalResultInput.value = "Belum selesai";
  if (dom.journalProfitInput) dom.journalProfitInput.value = "";
  if (dom.journalLossInput) dom.journalLossInput.value = "";
  dom.journalFileMeta.textContent = "Gambar chart, video, PDF, Markdown, Word";
  dom.journalMessage.textContent = "";
  state.pendingJournalFiles = [];
  requestAnimationFrame(() => dom.journalTitleInput?.focus());
}

async function handleJournalFilePick() {
  const files = [...(dom.journalFileInput?.files || [])];
  state.pendingJournalFiles = [];
  if (!files.length) {
    dom.journalFileMeta.textContent = "Gambar chart, video, PDF, Markdown, Word";
    return;
  }
  try {
    const pending = [];
    for (const file of files) {
      const media = await makePendingMedia(file, { compressImage: true });
      if (media) pending.push(media);
    }
    state.pendingJournalFiles = pending;
    dom.journalFileMeta.textContent = pending.length === 1
      ? `${pending[0].name} • ${formatBytes(pending[0].size)}`
      : `${pending.length} lampiran dipilih`;
    if (!dom.journalTitleInput.value.trim() && pending[0]) {
      dom.journalTitleInput.value = fileTitleFromName(pending[0].name);
    }
  } catch {
    dom.journalMessage.textContent = "Lampiran jurnal belum bisa dibaca.";
  }
}

function getJournalFormData() {
  const now = new Date().toISOString();
  const existing = state.journals.find((journal) => journal.id === dom.journalId.value);
  const draft = {
    id: existing?.id || createId(),
    date: dom.journalDateInput.value || new Date().toISOString().slice(0, 10),
    title: dom.journalTitleInput.value.trim() || "Jurnal Trading",
    market: dom.journalMarketInput.value.trim(),
    setup: dom.journalSetupInput.value.trim(),
    result: dom.journalResultInput.value,
    profit: parseTradeAmount(dom.journalProfitInput?.value),
    loss: parseTradeAmount(dom.journalLossInput?.value),
    plan: dom.journalPlanInput.value.trim(),
    evaluation: dom.journalEvaluationInput.value.trim(),
    mistakes: dom.journalMistakesInput.value.trim(),
    lessons: dom.journalLessonsInput.value.trim(),
    emotion: dom.journalEmotionInput.value.trim(),
    attachments: [...(existing?.attachments || [])],
    revisionHistory: [...(existing?.revisionHistory || [])],
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };
  if (existing) {
    draft.revisionHistory = buildJournalRevisionHistory(existing, draft, now);
  }
  return draft;
}

function buildJournalRevisionHistory(existing, next, now) {
  const changed = ["title", "market", "setup", "result", "profit", "loss", "plan", "evaluation", "mistakes", "lessons", "emotion"]
    .some((key) => String(existing?.[key] || "") !== String(next?.[key] || ""));
  if (!changed) return existing.revisionHistory || [];
  return [
    ...(existing.revisionHistory || []),
    {
      at: now,
      title: existing.title,
      result: existing.result,
      plan: existing.plan,
      evaluation: existing.evaluation,
      mistakes: existing.mistakes,
      lessons: existing.lessons
    }
  ].slice(-30);
}

async function saveJournalForm(event) {
  event.preventDefault();
  const journal = getJournalFormData();
  const createdFileIds = [];
  try {
    for (const pending of state.pendingJournalFiles || []) {
      const fileId = createId();
      await putFileRecord({
        id: fileId,
        itemId: journal.id,
        blob: pending.file,
        name: pending.name,
        type: pending.type,
        size: pending.size,
        kind: pending.kind,
        documentType: pending.documentType || "",
        documentText: pending.documentText || "",
        fileHash: pending.fileHash || "",
        uploadedAt: new Date().toISOString()
      });
      createdFileIds.push(fileId);
      journal.attachments.push({
        fileId,
        name: pending.name,
        type: pending.type,
        size: pending.size,
        kind: pending.kind,
        documentType: pending.documentType || "",
        documentText: pending.documentText || "",
        uploadedAt: new Date().toISOString()
      });
    }
    const exists = state.journals.some((entry) => entry.id === journal.id);
    state.journals = exists
      ? state.journals.map((entry) => entry.id === journal.id ? journal : entry)
      : [journal, ...state.journals];
    saveJournals();
    state.pendingJournalFiles = [];
    dom.journalFileInput.value = "";
    resetJournalForm();
    render();
  } catch {
    await Promise.all(createdFileIds.map((fileId) => deleteFileRecord(fileId).catch(() => {})));
    dom.journalMessage.textContent = "Jurnal belum tersimpan.";
  }
}

function renderJournals() {
  if (!dom.journalList) return;
  dom.journalList.replaceChildren();
  const journals = [...state.journals].sort((a, b) => dateValue(b.date || b.updatedAt || b.createdAt) - dateValue(a.date || a.updatedAt || a.createdAt));
  dom.journalEmpty.hidden = journals.length > 0;
  dom.journalCount.textContent = `${journals.length} jurnal`;
  const grouped = groupJournalsByDate(journals);
  const fragment = document.createDocumentFragment();
  grouped.forEach(([date, rows]) => fragment.append(createJournalDateGroup(date, rows)));
  dom.journalList.append(fragment);
}

function groupJournalsByDate(journals) {
  const map = new Map();
  journals.forEach((journal) => {
    const date = journal.date || new Date().toISOString().slice(0, 10);
    if (!map.has(date)) map.set(date, []);
    map.get(date).push(journal);
  });
  return [...map.entries()].sort((a, b) => dateValue(b[0]) - dateValue(a[0]));
}

function createJournalDateGroup(date, journals) {
  const group = document.createElement("article");
  group.className = "journal-date-group";
  group.dataset.journalDateGroup = date;
  const isOpen = state.journalOpenDate === date;
  group.classList.toggle("is-open", isOpen);

  const win = journals.filter((journal) => journal.result === "Win").length;
  const loss = journals.filter((journal) => journal.result === "Loss").length;
  const profit = journals.reduce((sum, journal) => sum + parseTradeAmount(journal.profit), 0);
  const lossAmount = journals.reduce((sum, journal) => sum + parseTradeAmount(journal.loss), 0);

  const head = document.createElement("button");
  head.type = "button";
  head.className = "journal-date-head";
  head.innerHTML = `
    <span><strong>${formatDate(date)}</strong><small>${journals.length} jurnal • ${win}W / ${loss}L</small></span>
    <em>${formatTradeAmount(profit - lossAmount)}</em>
    <i aria-hidden="true"></i>
  `;
  head.addEventListener("click", () => toggleJournalDateGroup(date));
  group.append(head);

  if (isOpen) {
    const body = document.createElement("div");
    body.className = "journal-date-body";
    journals.forEach((journal) => body.append(createJournalCard(journal, state.journalOpenId === journal.id)));
    group.append(body);
  }
  return group;
}

function toggleJournalDateGroup(date) {
  state.journalOpenDate = state.journalOpenDate === date ? "" : date;
  state.journalOpenId = "";
  renderJournals();
}

function toggleJournalDetails(id) {
  state.journalOpenId = state.journalOpenId === id ? "" : id;
  renderJournals();
  requestAnimationFrame(() => document.querySelector(`[data-id="${CSS.escape(id)}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
}

function createJournalCard(journal, expanded = false) {
  const card = document.createElement("article");
  card.className = "journal-card";
  card.classList.toggle("is-expanded", expanded);
  card.dataset.id = journal.id;

  const head = document.createElement("div");
  head.className = "journal-card-head";
  const copy = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = journal.title;
  const meta = document.createElement("p");
  meta.textContent = [formatDate(journal.date), journal.market, journal.setup, journal.result, getJournalProfitLossText(journal)].filter(Boolean).join(" • ");
  copy.append(title, meta);

  const actions = document.createElement("div");
  actions.className = "journal-actions";
  const edit = makeJournalButton("Edit", () => editJournal(journal.id));
  const analyze = makeJournalButton("Tanya", () => askFromJournal(journal.id));
  const remove = makeJournalButton("Hapus", () => deleteJournal(journal.id), "danger");
  [edit, analyze, remove].forEach((button) => button.addEventListener("click", (event) => event.stopPropagation()));
  actions.append(edit, analyze, remove);
  copy.addEventListener("click", () => toggleJournalDetails(journal.id));
  head.append(copy, actions);

  const body = document.createElement("div");
  body.className = "journal-body";
  body.append(makeJournalTextBlock("Catatan awal", journal.plan));
  body.append(makeJournalTextBlock("Evaluasi", journal.evaluation));
  body.append(makeJournalTextBlock("Kesalahan", journal.mistakes));
  body.append(makeJournalTextBlock("Pelajaran", journal.lessons));
  if (journal.emotion) body.append(makeJournalTextBlock("Emosi", journal.emotion));
  body.hidden = !expanded;

  const attachments = document.createElement("div");
  attachments.className = "journal-attachments";
  if ((journal.attachments || []).length) {
    journal.attachments.forEach((attachment) => attachments.append(createJournalAttachment(journal, attachment)));
  }
  attachments.hidden = !expanded || !(journal.attachments || []).length;

  const rev = document.createElement("p");
  rev.className = "revision-line";
  rev.textContent = (journal.revisionHistory || []).length ? `${journal.revisionHistory.length} revisi tersimpan` : "";
  rev.hidden = !expanded || !(journal.revisionHistory || []).length;

  card.append(head, body, attachments, rev);
  return card;
}

function makeJournalButton(text, onClick, extraClass = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `small-button ${extraClass}`.trim();
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

function makeJournalTextBlock(label, value) {
  const block = document.createElement("div");
  block.className = "journal-text-block";
  const title = document.createElement("strong");
  title.textContent = label;
  const text = document.createElement("p");
  text.textContent = value || "-";
  block.append(title, text);
  return block;
}

function createJournalAttachment(journal, attachment) {
  const item = journalAttachmentToItem(journal, attachment);
  const wrap = document.createElement("button");
  wrap.type = "button";
  wrap.className = "journal-attachment";
  wrap.title = attachment.name || "Lampiran";
  const mark = document.createElement("span");
  mark.textContent = attachment.kind === "image" ? "▣" : attachment.kind === "video" ? "▶" : (attachment.documentType || "DOC");
  const name = document.createElement("small");
  name.textContent = attachment.name || "Lampiran";
  wrap.append(mark, name);
  wrap.addEventListener("click", () => showFullscreenViewer(item));
  if (attachment.kind === "image") {
    loadItemObjectUrl(item).then((url) => {
      if (!url) return;
      wrap.style.backgroundImage = `linear-gradient(rgba(0,0,0,.28),rgba(0,0,0,.62)), url(${url})`;
    }).catch(() => {});
  }
  return wrap;
}

function journalAttachmentToItem(journal, attachment) {
  return {
    id: `${journal.id}:${attachment.fileId}`,
    title: `${journal.title} - ${attachment.name || "Lampiran"}`,
    type: attachment.kind === "image" ? "Gambar Chart" : attachment.kind === "video" ? "Video Pembelajaran" : "Dokumen",
    category: attachment.kind === "image" ? "Gambar Chart" : attachment.kind === "video" ? "Video" : getCategoryForDocumentType(attachment.documentType),
    status: journal.result || "Belum dibaca",
    notes: journal.plan || journal.evaluation || "Lampiran jurnal",
    mediaUrl: "",
    fileId: attachment.fileId,
    mediaKind: attachment.kind,
    mediaName: attachment.name,
    mediaType: attachment.type,
    mediaSize: attachment.size,
    documentType: attachment.documentType || "",
    documentText: attachment.documentText || "",
    uploadedAt: attachment.uploadedAt,
    createdAt: journal.createdAt,
    updatedAt: journal.updatedAt
  };
}

function editJournal(id) {
  const journal = state.journals.find((entry) => entry.id === id);
  if (!journal) return;
  dom.journalId.value = journal.id;
  dom.journalDateInput.value = journal.date || new Date().toISOString().slice(0, 10);
  dom.journalMarketInput.value = journal.market || "";
  dom.journalTitleInput.value = journal.title || "";
  dom.journalSetupInput.value = journal.setup || "";
  dom.journalResultInput.value = journal.result || "Belum selesai";
  if (dom.journalProfitInput) dom.journalProfitInput.value = journal.profit ? String(journal.profit) : "";
  if (dom.journalLossInput) dom.journalLossInput.value = journal.loss ? String(journal.loss) : "";
  dom.journalPlanInput.value = journal.plan || "";
  dom.journalEvaluationInput.value = journal.evaluation || "";
  dom.journalMistakesInput.value = journal.mistakes || "";
  dom.journalLessonsInput.value = journal.lessons || "";
  dom.journalEmotionInput.value = journal.emotion || "";
  dom.journalFileMeta.textContent = "Tambah lampiran baru bila perlu";
  dom.journalMessage.textContent = "Mode edit jurnal aktif.";
  setView("journal");
  dom.journalForm.scrollIntoView({ block: "start", behavior: "smooth" });
}

async function deleteJournal(id) {
  const journal = state.journals.find((entry) => entry.id === id);
  if (!journal) return;
  if (!window.confirm(`Hapus jurnal "${journal.title}"?`)) return;
  await Promise.all((journal.attachments || []).map((attachment) => deleteFileRecord(attachment.fileId).catch(() => {})));
  state.journals = state.journals.filter((entry) => entry.id !== id);
  saveJournals();
  render();
}

function parseTradeAmount(value) {
  const normalized = String(value ?? "").replace(/,/g, ".").replace(/[^0-9.-]/g, "");
  const number = Number.parseFloat(normalized);
  return Number.isFinite(number) ? Math.max(0, number) : 0;
}

function formatTradeAmount(value) {
  const number = Number(value) || 0;
  const sign = number < 0 ? "-" : "";
  const abs = Math.abs(number);
  return `${sign}${abs.toLocaleString("id-ID", { maximumFractionDigits: 2 })}`;
}

function getJournalProfitLossText(journal) {
  const profit = parseTradeAmount(journal.profit);
  const loss = parseTradeAmount(journal.loss);
  if (profit && loss) return `P/L ${formatTradeAmount(profit - loss)}`;
  if (profit) return `Profit ${formatTradeAmount(profit)}`;
  if (loss) return `Loss ${formatTradeAmount(loss)}`;
  return "";
}

function loadAssistantSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(ASSISTANT_SETTINGS_KEY) || "{}");
    state.aiProvider = saved.provider || saved.aiProvider || "gemini";
    state.geminiApiKey = saved.apiKey || "";
    state.geminiModel = saved.model || getDefaultModelForProvider(state.aiProvider);
    state.aiBaseUrl = saved.baseUrl || "";
  } catch {
    state.aiProvider = "gemini";
    state.geminiApiKey = "";
    state.geminiModel = getDefaultModelForProvider("gemini");
    state.aiBaseUrl = "";
  }
  try {
    state.insightCache = JSON.parse(localStorage.getItem(INSIGHT_CACHE_KEY) || "null");
  } catch {
    state.insightCache = null;
  }
}

function saveGeminiSettings(showMessage = true) {
  state.aiProvider = dom.aiProviderInput?.value || state.aiProvider || "gemini";
  state.geminiApiKey = dom.geminiApiKeyInput?.value.trim() || "";
  state.geminiModel = dom.geminiModelInput?.value.trim() || getDefaultModelForProvider(state.aiProvider);
  state.aiBaseUrl = normalizeBaseUrl(dom.aiBaseUrlInput?.value.trim() || "");
  localStorage.setItem(ASSISTANT_SETTINGS_KEY, JSON.stringify({
    provider: state.aiProvider,
    apiKey: state.geminiApiKey,
    model: state.geminiModel,
    baseUrl: state.aiBaseUrl
  }));
  syncProviderFields();
  if (showMessage && dom.assistantMessage) {
    dom.assistantMessage.textContent = state.geminiApiKey ? `API ${getProviderLabel(state.aiProvider)} tersimpan lokal di PWA.` : "API key kosong.";
  }
}

function clearGeminiSettings() {
  state.aiProvider = dom.aiProviderInput?.value || "gemini";
  state.geminiApiKey = "";
  state.geminiModel = getDefaultModelForProvider(state.aiProvider);
  state.aiBaseUrl = "";
  localStorage.removeItem(ASSISTANT_SETTINGS_KEY);
  if (dom.geminiApiKeyInput) dom.geminiApiKeyInput.value = "";
  if (dom.geminiModelInput) dom.geminiModelInput.value = state.geminiModel;
  if (dom.aiBaseUrlInput) dom.aiBaseUrlInput.value = "";
  syncProviderFields();
  if (dom.assistantMessage) dom.assistantMessage.textContent = "API key dihapus.";
}

function renderAssistantPanel() {
  if (!dom.geminiApiKeyInput) return;
  if (dom.aiProviderInput && document.activeElement !== dom.aiProviderInput) dom.aiProviderInput.value = state.aiProvider || "gemini";
  if (document.activeElement !== dom.geminiApiKeyInput) dom.geminiApiKeyInput.value = state.geminiApiKey || "";
  if (document.activeElement !== dom.geminiModelInput) dom.geminiModelInput.value = state.geminiModel || getDefaultModelForProvider(state.aiProvider);
  if (dom.aiBaseUrlInput && document.activeElement !== dom.aiBaseUrlInput) dom.aiBaseUrlInput.value = state.aiBaseUrl || "";
  syncProviderFields();
  renderInsightBox();
}

function syncProviderFields() {
  const provider = dom.aiProviderInput?.value || state.aiProvider || "gemini";
  state.aiProvider = provider;
  const defaultModel = getDefaultModelForProvider(provider);
  if (dom.geminiModelInput) {
    dom.geminiModelInput.placeholder = defaultModel;
    if (!dom.geminiModelInput.value.trim()) dom.geminiModelInput.value = defaultModel;
  }
  if (dom.aiBaseUrlInput) {
    const needsBaseUrl = provider === "custom";
    dom.aiBaseUrlInput.closest("label")?.toggleAttribute("hidden", !needsBaseUrl);
    dom.aiBaseUrlInput.required = needsBaseUrl;
    dom.aiBaseUrlInput.placeholder = "https://domain-api-kamu.com/v1/chat/completions";
  }
}

function handleProviderChange() {
  const provider = dom.aiProviderInput?.value || "gemini";
  state.aiProvider = provider;
  const defaultModel = getDefaultModelForProvider(provider);
  if (dom.geminiModelInput) dom.geminiModelInput.value = defaultModel;
  syncProviderFields();
}

function getDefaultModelForProvider(provider) {
  const defaults = {
    gemini: "gemini-2.0-flash",
    groq: "llama-3.1-8b-instant",
    openrouter: "google/gemini-2.0-flash-001",
    mistral: "mistral-small-latest",
    openai: "gpt-4o-mini",
    custom: ""
  };
  return defaults[provider] || defaults.gemini;
}

function getProviderLabel(provider) {
  const labels = {
    gemini: "Gemini",
    groq: "Groq",
    openrouter: "OpenRouter",
    mistral: "Mistral/Mimo",
    openai: "OpenAI",
    custom: "Custom API"
  };
  return labels[provider] || provider || "AI";
}

function normalizeBaseUrl(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function saveInsightCache() {
  if (state.insightCache) {
    localStorage.setItem(INSIGHT_CACHE_KEY, JSON.stringify(state.insightCache));
  } else {
    localStorage.removeItem(INSIGHT_CACHE_KEY);
  }
}

function clearInsightCache() {
  state.insightCache = null;
  saveInsightCache();
  renderAssistantPanel();
}

function updateInsightCache() {
  refreshInsightCache({ renderPanel: true, showMessage: true });
}

function refreshInsightCache(options = {}) {
  const { renderPanel = state.view === "assistant", showMessage = false } = options;
  try {
    const text = buildLocalInsightText();
    state.insightCache = {
      updatedAt: new Date().toISOString(),
      text,
      cards: buildInsightCards()
    };
    saveInsightCache();
    if (renderPanel) renderInsightBox();
    if (showMessage && dom.assistantMessage) dom.assistantMessage.textContent = "Insight lokal diperbarui otomatis tanpa memakai API.";
  } catch {}
}

function buildLocalInsightText() {
  const keywordRows = getKeywordRows();
  const journalResults = countBy(state.journals, (journal) => journal.result || "Belum selesai");
  const setups = countBy(state.journals, (journal) => journal.setup || "Tanpa setup");
  const categories = countBy(state.items, (item) => item.category || "Tanpa kategori");
  const stats = calculateJournalStats(state.journals);
  const profitSetups = rankSetupsByAmount("profit");
  const lossSetups = rankSetupsByAmount("loss");
  const recentJournals = state.journals.slice(0, 5).map((journal) => `- ${formatDate(journal.date)} ${journal.market || ""} ${journal.result || ""} ${getJournalProfitLossText(journal)}: ${journal.mistakes || journal.lessons || journal.plan || "tanpa catatan"}`.trim()).join("\n");
  return [
    `Update: ${new Date().toLocaleString("id-ID")}`,
    `Total file/materi: ${state.items.length}`,
    `Total jurnal: ${state.journals.length}`,
    `Win rate: ${stats.winRate}%`,
    `Total profit: ${formatTradeAmount(stats.totalProfit)}`,
    `Total loss: ${formatTradeAmount(stats.totalLoss)}`,
    `Net P/L: ${formatTradeAmount(stats.netProfit)}`,
    `Rata-rata profit: ${formatTradeAmount(stats.averageProfit)}`,
    `Rata-rata loss: ${formatTradeAmount(stats.averageLoss)}`,
    `Setup paling profit: ${profitSetups || "belum ada"}`,
    `Setup paling merugikan: ${lossSetups || "belum ada"}`,
    `Pola kata kunci dominan: ${keywordRows.length ? keywordRows.map((row) => `${row.label} (${row.count})`).join(", ") : "belum cukup data"}`,
    `Hasil jurnal: ${formatCountMap(journalResults)}`,
    `Setup jurnal: ${formatCountMap(setups)}`,
    `Kategori file dominan: ${formatCountMap(categories)}`,
    `Jurnal terbaru:\n${recentJournals || "Belum ada jurnal."}`
  ].join("\n");
}

function getKeywordRows() {
  const allTexts = [
    ...state.items.map((item) => [item.title, item.category, item.status, item.collection, item.notes, item.documentText, ...(item.tags || [])].join(" ")),
    ...state.journals.map((journal) => [journal.title, journal.market, journal.setup, journal.result, journal.plan, journal.evaluation, journal.mistakes, journal.lessons, journal.emotion].join(" "))
  ].join("\n").toLowerCase();
  const keywordMap = {
    "FOMO": ["fomo", "takut ketinggalan"],
    "Revenge trade": ["revenge", "balas", "balas dendam"],
    "Entry terlalu cepat": ["entry cepat", "terlalu cepat", "cepat entry"],
    "Overconfidence": ["over confident", "overconfidence", "terlalu confident", "percaya diri"],
    "Overtrading": ["overtrading", "terlalu banyak", "banyak entry"],
    "Risk management": ["risk", "rr", "sl", "stop loss", "lot"],
    "Liquidity / sweep": ["liquidity", "sweep", "liquid", "fakeout"],
    "Order Block / FVG": ["order block", "ob", "fvg", "fair value gap"]
  };
  return Object.entries(keywordMap).map(([label, words]) => ({
    label,
    count: words.reduce((sum, word) => sum + countOccurrences(allTexts, word), 0)
  })).filter((row) => row.count).sort((a, b) => b.count - a.count);
}

function buildInsightCards() {
  const stats = calculateJournalStats(state.journals);
  const keywordRows = getKeywordRows();
  const topKeyword = keywordRows[0]?.label || "Belum cukup data";
  const topSetup = countBy(state.journals, (journal) => journal.setup || "Tanpa setup")[0]?.[0] || "Belum ada";
  return [
    { label: "Jurnal", value: state.journals.length },
    { label: "Win Rate", value: `${stats.winRate}%` },
    { label: "Net P/L", value: formatTradeAmount(stats.netProfit) },
    { label: "Kesalahan", value: topKeyword },
    { label: "Setup", value: topSetup }
  ];
}

function renderInsightBox() {
  if (!dom.insightBox) return;
  if (!state.insightCache) {
    dom.insightBox.textContent = "Belum ada insight. Tekan Update Insight.";
    return;
  }
  const cards = state.insightCache.cards || buildInsightCards();
  dom.insightBox.innerHTML = `
    <div class="insight-cards">
      ${cards.map((card) => `<article class="insight-mini-card"><span>${escapeHtml(card.label)}</span><strong>${escapeHtml(card.value)}</strong></article>`).join("")}
    </div>
    <pre class="insight-text">${escapeHtml(state.insightCache.text || "")}</pre>
  `;
}

function rankSetupsByAmount(key) {
  const map = new Map();
  state.journals.forEach((journal) => {
    const setup = journal.setup || "Tanpa setup";
    const amount = parseTradeAmount(journal[key]);
    if (!amount) return;
    map.set(setup, (map.get(setup) || 0) + amount);
  });
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([setup, amount]) => `${setup} (${formatTradeAmount(amount)})`).join(", ");
}

function countOccurrences(text, word) {
  if (!word) return 0;
  return (text.match(new RegExp(escapeRegExp(word), "g")) || []).length;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countBy(items, getter) {
  const map = new Map();
  items.forEach((item) => {
    const key = getter(item) || "-";
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
}

function formatCountMap(entries) {
  return entries.length ? entries.map(([key, count]) => `${key} (${count})`).join(", ") : "belum ada";
}

async function testGeminiConnection() {
  saveGeminiSettings(false);
  if (!state.geminiApiKey) {
    dom.assistantMessage.textContent = "Isi API key dulu.";
    return;
  }
  dom.assistantMessage.textContent = `Mengetes koneksi ${getProviderLabel(state.aiProvider)}...`;
  try {
    await callAI([{ text: "Balas singkat dalam bahasa Indonesia: koneksi berhasil." }]);
    dom.assistantMessage.textContent = `Koneksi ${getProviderLabel(state.aiProvider)} berhasil.`;
  } catch (error) {
    dom.assistantMessage.textContent = `Koneksi gagal: ${error.message || "API error"}`;
  }
}

async function askAssistant() {
  const question = dom.assistantQuestionInput.value.trim();
  await runAssistantQuestion(question, dom.assistantAnswer);
}

async function runAssistantQuestion(question, targetElement) {
  saveGeminiSettings();
  if (!question) return "";
  if (!state.geminiApiKey) {
    if (targetElement) targetElement.textContent = "Isi API key dulu di Pengaturan API.";
    return "";
  }
  refreshInsightCache({ renderPanel: state.view === "assistant" });
  if (targetElement) targetElement.textContent = "Menganalisis dari materi, jurnal, statistik, lalu pengetahuan AI jika perlu...";
  const context = await getRelevantLocalContext(question);
  const prompt = `Kamu adalah asisten trading pribadi di aplikasi Trading Library Manager. Jawab dalam bahasa Indonesia, ringkas, praktis, dan edukatif. Jangan memberi sinyal pasti buy/sell.

Aturan sumber:
1. Prioritaskan Sumber Lokal dari materi terupload, jurnal, statistik, catatan file, dan insight lokal.
2. Jika Sumber Lokal tidak cukup, boleh jawab memakai pengetahuan umum AI/Gemini.
3. Di akhir jawaban tulis sumber secara jelas, misalnya "Sumber: materi terupload", "Sumber: jurnal trading", "Sumber: statistik", atau "Sumber: pengetahuan AI/Gemini, bukan dari materi/jurnal pengguna".

Insight kebiasaan lokal:
${state.insightCache?.text || "Belum ada insight."}

${context.text}

Pertanyaan pengguna:
${question}`;
  try {
    const answer = await callAI([{ text: prompt }]);
    if (targetElement) targetElement.textContent = answer;
    return answer;
  } catch (error) {
    const message = `Gagal memanggil ${getProviderLabel(state.aiProvider)}: ${error.message || "API error"}`;
    if (targetElement) targetElement.textContent = message;
    return "";
  }
}

async function getRelevantLocalContext(query) {
  const terms = query.toLowerCase().split(/\s+/).filter((word) => word.length > 2).slice(0, 12);
  const scoredItems = [];

  for (const item of state.items) {
    const metaText = [item.title, item.category, item.notes, item.code, item.mediaName, item.documentType, ...(item.tags || [])].join(" ");
    let text = metaText;
    let score = scoreText(metaText, terms);
    if (isDocumentItem(item) && getDocumentType(item) !== "PDF") {
      try {
        const docText = await readItemText(item);
        if (docText) {
          const clipped = docText.slice(0, 4000);
          text = `${metaText}\n${clipped}`;
          score += scoreText(clipped, terms);
        }
      } catch {}
    }
    if (score > 0) scoredItems.push({ item, score, text });
  }

  const itemRows = scoredItems
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ item, text }) => `Materi/File: ${item.title} | ${item.category} | ${String(text || "").slice(0, 1200)}`);

  const journalRows = state.journals.map((journal) => ({ journal, score: scoreText([journal.title, journal.market, journal.setup, journal.plan, journal.evaluation, journal.mistakes, journal.lessons, journal.emotion].join(" "), terms) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ journal }) => `Jurnal: ${journal.date} ${journal.market} ${journal.setup} ${journal.result} ${getJournalProfitLossText(journal)} | Catatan: ${journal.plan} | Evaluasi: ${journal.evaluation} | Kesalahan: ${journal.mistakes} | Pelajaran: ${journal.lessons} | Emosi: ${journal.emotion}`);

  const stats = calculateJournalStats(state.journals);
  const statsRow = `Statistik: total jurnal ${state.journals.length}, win rate ${stats.winRate}%, profit ${formatTradeAmount(stats.totalProfit)}, loss ${formatTradeAmount(stats.totalLoss)}, net P/L ${formatTradeAmount(stats.netProfit)}.`;
  const localRows = [...journalRows, ...itemRows];
  return {
    hasLocalContext: localRows.length > 0,
    text: localRows.length
      ? `Sumber Lokal relevan:\n${statsRow}\n${localRows.join("\n")}`
      : `Sumber Lokal relevan:\n${statsRow}\nTidak ada materi/jurnal yang cocok langsung dengan pertanyaan. Jika menjawab di luar data aplikasi, tulis sumber sebagai pengetahuan AI/Gemini.`
  };
}

function scoreText(text, terms) {
  const value = String(text || "").toLowerCase();
  return terms.reduce((sum, term) => sum + (value.includes(term) ? 1 : 0), 0);
}

function toggleAiChatPopup() {
  if (!dom.aiChatPopup) return;
  if (dom.aiChatPopup.hidden) openAiChatPopup();
  else closeAiChatPopup();
}

function openAiChatPopup() {
  if (!dom.aiChatPopup) return;
  dom.aiChatPopup.hidden = false;
  dom.aiChatToggleBtn?.classList.add("is-active");
  requestAnimationFrame(() => dom.aiPopupQuestionInput?.focus());
}

function closeAiChatPopup() {
  if (!dom.aiChatPopup) return;
  dom.aiChatPopup.hidden = true;
  dom.aiChatToggleBtn?.classList.remove("is-active");
}

async function askAiPopup() {
  const question = dom.aiPopupQuestionInput?.value.trim() || "";
  if (!question) return;
  if (dom.saveAiPopupMaterialBtn) dom.saveAiPopupMaterialBtn.disabled = true;
  const answer = await runAssistantQuestion(question, dom.aiPopupAnswer);
  state.aiPopupLastQuestion = question;
  state.aiPopupLastAnswer = answer;
  if (dom.saveAiPopupMaterialBtn) dom.saveAiPopupMaterialBtn.disabled = !answer;
}

function saveAiPopupAsMaterial() {
  const question = state.aiPopupLastQuestion || dom.aiPopupQuestionInput?.value.trim() || "";
  const answer = state.aiPopupLastAnswer || dom.aiPopupAnswer?.textContent || "";
  if (!question || !answer) return;
  const now = new Date();
  const iso = now.toISOString();
  const title = `Catatan AI ${iso.slice(0, 10)} ${String(now.getHours()).padStart(2, "0")}.${String(now.getMinutes()).padStart(2, "0")}`;
  const markdown = `# ${title}\n\n## Pertanyaan\n${question}\n\n## Jawaban\n${answer}\n`;
  const encoded = encodeURIComponent(markdown);
  const item = {
    id: createId(),
    title,
    type: "Dokumen",
    category: "Markdown",
    status: "Belum dibaca",
    collection: "Catatan AI",
    tags: ["AI", "Chat"],
    notes: "Materi dibuat dari popup chat AI.",
    checklist: [],
    code: "",
    mediaUrl: `data:text/markdown;charset=utf-8,${encoded}`,
    fileId: "",
    mediaKind: "document",
    mediaName: `${sanitizeFileName(title)}.md`,
    mediaType: "text/markdown",
    mediaSize: markdown.length,
    documentType: "Markdown",
    documentText: "",
    fileHash: "",
    favorite: false,
    archived: false,
    revisionHistory: [],
    uploadedAt: iso,
    createdAt: iso,
    updatedAt: iso
  };
  state.items = [item, ...state.items];
  saveItems();
  resetGridLimits();
  render();
  if (dom.aiPopupAnswer) dom.aiPopupAnswer.textContent = `${answer}\n\n✓ Disimpan sebagai materi: ${title}`;
}

async function askFromJournal(id) {
  const journal = state.journals.find((entry) => entry.id === id);
  if (!journal) return;
  setView("assistant");
  dom.assistantQuestionInput.value = `Analisis jurnal ini berdasarkan kebiasaan trading saya. Data jurnal lengkap:
${formatJournalForAI(journal)}`;
  await askAssistant();
}

function formatJournalForAI(journal) {
  return [
    `Tanggal: ${formatDate(journal.date)}`,
    `Market: ${journal.market || "-"}`,
    `Judul: ${journal.title || "-"}`,
    `Setup: ${journal.setup || "-"}`,
    `Hasil: ${journal.result || "-"}`,
    `Profit: ${formatTradeAmount(parseTradeAmount(journal.profit))}`,
    `Loss: ${formatTradeAmount(parseTradeAmount(journal.loss))}`,
    `Net P/L: ${formatTradeAmount(parseTradeAmount(journal.profit) - parseTradeAmount(journal.loss))}`,
    `Catatan awal: ${journal.plan || "-"}`,
    `Evaluasi: ${journal.evaluation || "-"}`,
    `Kesalahan: ${journal.mistakes || "-"}`,
    `Pelajaran: ${journal.lessons || "-"}`,
    `Emosi: ${journal.emotion || "-"}`,
    `Lampiran: ${(journal.attachments || []).length}`
  ].join("\n");
}

async function callAI(parts) {
  const provider = state.aiProvider || "gemini";
  if (provider === "gemini") return callGeminiProvider(parts);
  return callOpenAICompatibleProvider(parts, provider);
}

async function callGeminiProvider(parts) {
  const model = encodeURIComponent(state.geminiModel || getDefaultModelForProvider("gemini"));
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(state.geminiApiKey)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts }],
      generationConfig: { temperature: 0.35, topP: 0.9, maxOutputTokens: 1400 }
    })
  });
  if (!response.ok) throw new Error(await readApiError(response));
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n").trim();
  if (!text) throw new Error("Respons kosong");
  return text;
}

async function callOpenAICompatibleProvider(parts, provider) {
  const endpoint = getChatCompletionEndpoint(provider);
  const content = partsToOpenAIContent(parts);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: getOpenAICompatibleHeaders(provider),
    body: JSON.stringify({
      model: state.geminiModel || getDefaultModelForProvider(provider),
      messages: [
        {
          role: "system",
          content: "Kamu adalah asisten jurnal trading pribadi. Jawab dalam bahasa Indonesia, ringkas, praktis, dan edukatif. Jangan memberi sinyal pasti buy/sell."
        },
        { role: "user", content }
      ],
      temperature: 0.35,
      max_tokens: 1400
    })
  });
  if (!response.ok) throw new Error(await readApiError(response));
  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || data.output_text || "";
  if (!String(text).trim()) throw new Error("Respons kosong");
  return String(text).trim();
}

function getChatCompletionEndpoint(provider) {
  if (provider === "groq") return "https://api.groq.com/openai/v1/chat/completions";
  if (provider === "openrouter") return "https://openrouter.ai/api/v1/chat/completions";
  if (provider === "mistral") return "https://api.mistral.ai/v1/chat/completions";
  if (provider === "openai") return "https://api.openai.com/v1/chat/completions";
  if (provider === "custom") {
    const customUrl = normalizeBaseUrl(state.aiBaseUrl);
    if (!customUrl) throw new Error("Isi Base URL untuk Custom API.");
    return customUrl;
  }
  throw new Error(`Provider belum didukung: ${provider}`);
}

function getOpenAICompatibleHeaders(provider) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${state.geminiApiKey}`
  };
  if (provider === "openrouter") {
    headers["HTTP-Referer"] = location.origin;
    headers["X-Title"] = "Trading Library Manager";
  }
  return headers;
}

function partsToOpenAIContent(parts) {
  const imageParts = parts.filter((part) => part.inline_data);
  const text = parts.map((part) => part.text || "").filter(Boolean).join("\n\n").trim();
  if (!imageParts.length) return text;
  const content = [];
  if (text) content.push({ type: "text", text });
  imageParts.forEach((part) => {
    const mime = part.inline_data?.mime_type || "image/jpeg";
    const data = part.inline_data?.data || "";
    if (data) content.push({ type: "image_url", image_url: { url: `data:${mime};base64,${data}` } });
  });
  return content;
}

async function readApiError(response) {
  const status = `HTTP ${response.status}`;
  let body = "";
  try {
    const data = await response.clone().json();
    body = data.error?.message || data.message || data.detail || JSON.stringify(data.error || data).slice(0, 300);
  } catch {
    try {
      body = (await response.text()).slice(0, 300);
    } catch {}
  }
  return body ? `${status}: ${body}` : status;
}

function updateFullscreenAnalyzeButton() {
  if (!dom.fullscreenAnalyzeBtn) return;
  const item = state.activeFullscreenItem;
  const isImage = item && (item.mediaKind || inferMediaKind(item)) === "image";
  dom.fullscreenAnalyzeBtn.hidden = !isImage;
}

async function analyzeActiveChart() {
  saveGeminiSettings();
  const item = state.activeFullscreenItem;
  if (!item || (item.mediaKind || inferMediaKind(item)) !== "image") return;
  if (!state.geminiApiKey) {
    showFullscreenAnalysis("Isi API key dulu di tab Asisten.");
    return;
  }
  refreshInsightCache();
  showFullscreenAnalysis("Mengompres gambar dan menganalisis chart...");
  try {
    const inline = await makeGeminiImagePart(item);
    const prompt = `Analisis chart trading ini secara edukatif, bukan sinyal pasti. Fokus pada:\n- bias trend\n- struktur market\n- BOS / CHoCH jika terlihat\n- area Order Block\n- area FVG\n- Supply & Demand\n- liquidity / sweep\n- zona entry potensial agresif dan konservatif\n- invalidasi\n- risiko\n- catatan berdasarkan kebiasaan jurnal pengguna\n\nInsight kebiasaan pengguna:\n${state.insightCache?.text || "Belum ada insight."}\n\nFormat jawaban ringkas dengan poin yang mudah dibaca. Di akhir jawaban tulis: Sumber: gambar chart yang dianalisis + insight/jurnal pengguna jika dipakai.`;
    const answer = await callAI([{ text: prompt }, inline]);
    showFullscreenAnalysis(answer);
    if (dom.assistantAnswer) dom.assistantAnswer.textContent = answer;
  } catch (error) {
    showFullscreenAnalysis(`Analisis gagal: ${error.message || "API error"}`);
  }
}

function showFullscreenAnalysis(text) {
  if (!dom.fullscreenAnalysis) return;
  dom.fullscreenAnalysis.hidden = false;
  dom.fullscreenAnalysis.textContent = text;
}

async function makeGeminiImagePart(item) {
  const blob = await getFileBlob(item);
  if (!blob) throw new Error("Gambar lokal belum ditemukan.");
  const compressed = await compressImageForGemini(blob);
  const dataUrl = await blobToDataUrl(compressed.blob);
  const base64 = dataUrl.split(",")[1] || "";
  return { inline_data: { mime_type: compressed.mimeType, data: base64 } };
}

async function compressImageForGemini(blob) {
  const bitmap = await createImageBitmap(blob);
  const maxSide = 1100;
  const ratio = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * ratio));
  canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  const out = await new Promise((resolve) => canvas.toBlob((result) => resolve(result), "image/jpeg", 0.72));
  return { blob: out || blob, mimeType: out ? "image/jpeg" : (blob.type || "image/jpeg") };
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

boot();
