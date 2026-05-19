import { useState } from 'react'

const FAMILY_MEMBERS = ['Ryan', 'Russell', 'Robin', 'Rachel']
const HISTORY_STORAGE_KEY = 'family-meal-menu-history-v1'
const MAX_HISTORY_ITEMS = 24
const TOPPING_OPTIONS = [
  { id: 'fresh-cream', label: 'Fresh Cream', chinese: '鲜奶油' },
  { id: 'choc-ice-cream', label: 'Choc Ice cream', chinese: '巧克力冰淇淋' },
  { id: 'vanilla-ice-cream', label: 'Vanilla Ice cream', chinese: '香草冰淇淋' },
  { id: 'syrup', label: 'Syrup', chinese: '糖浆' },
  { id: 'strawberry', label: 'Strawberry', chinese: '草莓' },
  { id: 'blueberry', label: 'Blueberry', chinese: '蓝莓' },
  { id: 'nutella', label: 'Nutella', chinese: '能多益榛子酱' },
]
const BREAKFAST_OPTIONS = [
  {
    id: 'hk-style-french-toast',
    label: 'HK style French toast',
    chinese: '港式西多士',
    requiresToppings: true,
  },
  {
    id: 'waffle',
    label: 'Waffle',
    chinese: '华夫饼',
    requiresToppings: true,
  },
  {
    id: 'pancake',
    label: 'Pancake',
    chinese: '松饼',
    requiresToppings: true,
  },
  {
    id: 'hk-egg-waffle',
    label: 'HK Egg waffle',
    chinese: '港式鸡蛋仔',
    requiresToppings: false,
  },
  {
    id: 'jam-sandwich',
    label: 'Jam sandwich',
    chinese: '果酱三明治',
    requiresToppings: false,
  },
  {
    id: 'ham-and-cheese-sandwich',
    label: 'Ham and Cheese sandwich (grilled)',
    chinese: '火腿芝士烤三明治',
    requiresToppings: false,
  },
  {
    id: 'nutella-sandwich',
    label: 'Nutella sandwich',
    chinese: '能多益三明治',
    requiresToppings: false,
  },
  {
    id: 'foie-gras-pate-sandwich',
    label: 'Foie gras pate sandwich',
    chinese: '鹅肝酱三明治',
    requiresToppings: false,
  },
  {
    id: 'tomato-dough-piece-soup',
    label: 'Tomato dough piece soup',
    chinese: '番茄面片汤',
    requiresToppings: false,
  },
  {
    id: 'wonton',
    label: 'Wonton',
    chinese: '云吞',
    requiresToppings: false,
  },
  {
    id: 'chinese-beef-flatbread',
    label: 'Chinese beef flatbread',
    chinese: '牛肉馅饼',
    requiresToppings: false,
  },
  {
    id: 'egg-pancake',
    label: 'Egg pancake',
    chinese: '鸡蛋饼',
    requiresToppings: false,
  },
  {
    id: 'steamed-eggs',
    label: 'Steamed eggs',
    chinese: '蒸蛋',
    requiresToppings: false,
  },
  {
    id: 'boiled-eggs',
    label: 'Boiled eggs',
    chinese: '水煮蛋',
    requiresToppings: false,
  },
  {
    id: 'fruit-assortment',
    label: 'Fruit assortment (changes daily!)',
    chinese: '每日水果拼盘',
    requiresToppings: false,
  },
  {
    id: 'yogurt',
    label: 'Yogurt',
    chinese: '酸奶',
    requiresToppings: false,
  },
  {
    id: 'cereal',
    label: 'Cereal',
    chinese: '麦片',
    requiresToppings: false,
  },
  {
    id: 'milk',
    label: 'Milk',
    chinese: '牛奶',
    requiresToppings: false,
  },
  {
    id: 'oj',
    label: 'OJ',
    chinese: '橙汁',
    requiresToppings: false,
  },
  {
    id: 'porridge-with-pork-floss',
    label: 'Porridge with pork floss',
    chinese: '肉松粥',
    requiresToppings: false,
  },
  {
    id: 'hk-macaroni-with-soup',
    label: 'HK macaroni with soup',
    chinese: '港式通心粉汤',
    requiresToppings: false,
  },
]
const DINNER_OPTIONS = [
  { id: 'beef-noodle-soup', label: 'Beef noodle soup', chinese: '牛肉面' },
  { id: 'soy-braised-pork-noodles', label: 'Soy-braised pork noodles', chinese: '卤肉面' },
  { id: 'pan-fried-steamed-buns', label: 'Pan-fried steamed buns', chinese: '生煎包' },
  { id: 'kimchi-fried-rice', label: 'Kimchi fried rice', chinese: '泡菜炒饭' },
  { id: 'sweet-fried-dough-pancake', label: 'Sweet fried dough pancake', chinese: '糖油饼' },
  { id: 'tomato-and-egg-noodles', label: 'Tomato and egg noodles', chinese: '番茄鸡蛋面' },
  { id: 'spaghetti', label: 'Spaghetti', chinese: '意大利面' },
  { id: 'pizza', label: 'Pizza', chinese: '披萨' },
  { id: 'beef-burger', label: 'Beef burger', chinese: '牛肉汉堡' },
  { id: 'char-siu-pork', label: 'Char siu pork', chinese: '叉烧' },
  { id: 'rice', label: 'Rice', chinese: '米饭' },
  { id: 'tomato-beef-ribs', label: 'Tomato beef ribs', chinese: '番茄牛肋排' },
  { id: 'curry-rice', label: 'Curry rice', chinese: '咖喱饭' },
  { id: 'egg-and-beef-fried-rice', label: 'Egg and beef fried rice', chinese: '牛肉蛋炒饭' },
  { id: 'stir-fried-shredded-potatoes', label: 'Stir-fried shredded potatoes', chinese: '炒土豆丝' },
  { id: 'coca-cola-chicken-wings', label: 'Coca cola chicken wings', chinese: '可乐鸡翅' },
  { id: 'roasted-chicken-wings', label: 'Roasted chicken wings', chinese: '烤鸡翅' },
  { id: 'grilled-fish', label: 'Grilled fish', chinese: '烤鱼' },
  { id: 'seared-beef', label: 'Seared beef', chinese: '香煎牛肉' },
  { id: 'meat-buns', label: 'Meat buns', chinese: '肉包子' },
  { id: 'dumplings', label: 'Dumplings', chinese: '饺子' },
  { id: 'steamed-buns', label: 'Steamed buns', chinese: '馒头' },
  { id: 'tang-san-jiao', label: 'Tang san jiao', chinese: '汤三角' },
  { id: 'papaya-soup', label: 'Papaya soup', chinese: '木瓜汤' },
  { id: 'chicken-soup', label: 'Chicken soup', chinese: '鸡汤' },
  { id: 'wan-zi-tang', label: 'Wan zi tang', chinese: '丸子汤' },
  { id: 'mac-and-cheese', label: 'Macaroni and cheese', chinese: '芝士通心粉' },
]

const BREAKFAST_LOOKUP = Object.fromEntries(
  BREAKFAST_OPTIONS.map((option) => [option.id, option]),
)
const DINNER_LOOKUP = Object.fromEntries(
  DINNER_OPTIONS.map((option) => [option.id, option]),
)
const TOPPING_LOOKUP = Object.fromEntries(
  TOPPING_OPTIONS.map((option) => [option.id, option]),
)

const createEmptySelections = () =>
  Object.fromEntries(
    FAMILY_MEMBERS.map((member) => [
      member,
      {
        breakfast: [],
        dinner: [],
        toppings: [],
      },
    ]),
  )

const normalizeChoiceIds = (value) => {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'string' && value.length > 0) {
    return [value]
  }

  return []
}

const normalizeMemberSelection = (selection) => ({
  breakfast: normalizeChoiceIds(selection?.breakfast),
  dinner: normalizeChoiceIds(selection?.dinner),
  toppings: Array.isArray(selection?.toppings) ? selection.toppings : [],
})

const normalizeSelections = (sourceSelections = {}) =>
  Object.fromEntries(
    FAMILY_MEMBERS.map((member) => [
      member,
      normalizeMemberSelection(sourceSelections[member]),
    ]),
  )

const loadOrderHistory = () => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const rawHistory = window.localStorage.getItem(HISTORY_STORAGE_KEY)

    if (!rawHistory) {
      return []
    }

    const parsedHistory = JSON.parse(rawHistory)
    if (!Array.isArray(parsedHistory)) {
      return []
    }

    return parsedHistory.map((entry) => ({
      ...entry,
      selections: normalizeSelections(entry.selections),
    }))
  } catch {
    return []
  }
}

const persistOrderHistory = (history) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
}

function ChoiceCard({ title, description, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`choice-card ${selected ? 'choice-card-selected' : ''}`}
      aria-pressed={selected}
    >
      <div>
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.35em] ${
            selected ? 'text-white/70' : 'text-[#8f5c74]'
          }`}
        >
          Tap To Choose
        </span>
        <h3
          className={`mt-2 font-display text-xl uppercase tracking-[0.1em] md:text-2xl ${
            selected ? 'text-white' : 'text-[#2d1621]'
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-1 text-sm font-medium md:text-base ${
            selected ? 'text-white/90' : 'text-[#cc3e80]'
          }`}
        >
          {description}
        </p>
      </div>
      <span
        className={`mt-4 text-xs font-semibold uppercase tracking-[0.25em] ${
          selected ? 'text-white' : 'text-[#cc3e80]'
        }`}
      >
        {selected ? 'Selected' : 'Ready'}
      </span>
    </button>
  )
}

function ToppingChip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`choice-chip ${selected ? 'choice-chip-selected' : ''}`}
      aria-pressed={selected}
    >
      {label}
    </button>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-[#f0d1de] py-3">
      <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8f5c74]">
        {label}
      </span>
      <span className="text-right text-sm font-medium text-[#2d1621] md:text-base">
        {value}
      </span>
    </div>
  )
}

function RepeatWatchCard({ member, notes }) {
  return (
    <article className="summary-card">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8f5c74]">
            Repeat Watch
          </p>
          <h3 className="font-display text-3xl uppercase tracking-[0.1em] text-[#2d1621]">
            {member}
          </h3>
        </div>
        <span className="inline-flex bg-[#2d1621] px-3 py-1 text-xs font-bold uppercase tracking-[0.28em] text-white">
          {notes.length > 0 ? 'Check' : 'Balanced'}
        </span>
      </div>

      {notes.length > 0 ? (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note} className="rounded-none border border-[#f0d1de] bg-[#fff7fb] p-3 text-sm text-[#5f3b4d]">
              {note}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#5f3b4d]">
          No strong repeats showing in the saved order history yet.
        </p>
      )}
    </article>
  )
}

function App() {
  const [screen, setScreen] = useState('intro')
  const [currentMember, setCurrentMember] = useState(FAMILY_MEMBERS[0])
  const [selections, setSelections] = useState(createEmptySelections)
  const [orderHistory, setOrderHistory] = useState(loadOrderHistory)
  const [hasArchivedCurrentMenu, setHasArchivedCurrentMenu] = useState(false)

  const currentSelection = selections[currentMember]
  const currentIndex = FAMILY_MEMBERS.indexOf(currentMember)
  const todayLabel = new Intl.DateTimeFormat('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())
  const completedCount = FAMILY_MEMBERS.filter((member) => {
    const selection = selections[member]
    return selection.breakfast.length > 0 && selection.dinner.length > 0
  }).length
  const allComplete = completedCount === FAMILY_MEMBERS.length
  const selectedBreakfasts = currentSelection.breakfast.map(
    (breakfastId) => BREAKFAST_LOOKUP[breakfastId],
  )
  const selectedDinners = currentSelection.dinner.map(
    (dinnerId) => DINNER_LOOKUP[dinnerId],
  )
  const showToppings = selectedBreakfasts.some((breakfast) => breakfast?.requiresToppings)
  const recentHistory = orderHistory.slice(0, 6)

  const formatOptionLabels = (options) => {
    const validOptions = options.filter(Boolean)

    if (validOptions.length === 0) {
      return 'Not selected'
    }

    return validOptions
      .map((option) => `${option.label} · ${option.chinese}`)
      .join(', ')
  }

  const formatToppings = (toppingIds, needsToppings = false) => {
    if (toppingIds.length === 0) {
      return needsToppings ? 'No toppings yet' : 'Not needed'
    }

    return toppingIds
      .map((toppingId) => {
        const topping = TOPPING_LOOKUP[toppingId]
        return topping ? `${topping.label} · ${topping.chinese}` : toppingId
      })
      .join(', ')
  }

  const getMemberStatus = (member) => {
    const selection = selections[member]
    const isComplete = selection.breakfast.length > 0 && selection.dinner.length > 0
    const isCurrent = member === currentMember
    const hasProgress =
      selection.breakfast.length > 0 ||
      selection.dinner.length > 0 ||
      selection.toppings.length > 0

    if (isCurrent) {
      return 'Now Editing'
    }

    if (isComplete) {
      return 'Saved'
    }

    if (hasProgress) {
      return 'In Progress'
    }

    return 'Tap To Edit'
  }

  const findNextIncompleteMember = (fromMember) => {
    const startIndex = FAMILY_MEMBERS.indexOf(fromMember)

    for (let offset = 1; offset <= FAMILY_MEMBERS.length; offset += 1) {
      const candidate = FAMILY_MEMBERS[(startIndex + offset) % FAMILY_MEMBERS.length]
      const selection = selections[candidate]

      if (selection.breakfast.length === 0 || selection.dinner.length === 0) {
        return candidate
      }
    }

    return fromMember
  }

  const archiveCurrentMenu = () => {
    const historyEntry = {
      id: `menu-${Date.now()}`,
      savedAt: new Date().toISOString(),
      dateLabel: todayLabel,
      selections: normalizeSelections(selections),
    }

    const updatedHistory = [historyEntry, ...orderHistory].slice(0, MAX_HISTORY_ITEMS)
    setOrderHistory(updatedHistory)
    persistOrderHistory(updatedHistory)
    setHasArchivedCurrentMenu(true)
  }

  const buildRepeatNotes = (member) => {
    const currentMemberSelection = selections[member]

    if (
      currentMemberSelection.breakfast.length === 0 &&
      currentMemberSelection.dinner.length === 0
    ) {
      return []
    }
    const notes = []

    currentMemberSelection.breakfast.forEach((breakfastId) => {
      const breakfastCount = orderHistory.filter((entry) =>
        normalizeChoiceIds(entry.selections?.[member]?.breakfast).includes(breakfastId),
      ).length

      if (breakfastCount >= 3) {
        notes.push(
          `${member} has picked ${BREAKFAST_LOOKUP[breakfastId]?.label} ${breakfastCount} times in saved history.`,
        )
      }
    })

    currentMemberSelection.dinner.forEach((dinnerId) => {
      const dinnerCount = orderHistory.filter((entry) =>
        normalizeChoiceIds(entry.selections?.[member]?.dinner).includes(dinnerId),
      ).length

      if (dinnerCount >= 3) {
        notes.push(
          `${member} has picked ${DINNER_LOOKUP[dinnerId]?.label} ${dinnerCount} times in saved history.`,
        )
      }
    })

    return notes
  }

  const resetAll = () => {
    setScreen('intro')
    setCurrentMember(FAMILY_MEMBERS[0])
    setSelections(createEmptySelections())
    setHasArchivedCurrentMenu(false)
  }

  const startFlow = () => {
    setScreen('select')
    setCurrentMember(FAMILY_MEMBERS[0])
    setSelections(createEmptySelections())
    setHasArchivedCurrentMenu(false)
  }

  const handleBreakfastSelect = (breakfastId) => {
    const selectedOption = BREAKFAST_LOOKUP[breakfastId]

    setSelections((currentSelections) => {
      const currentMemberSelection = currentSelections[currentMember]
      const isSelected = currentMemberSelection.breakfast.includes(breakfastId)
      const nextBreakfasts = isSelected
        ? currentMemberSelection.breakfast.filter((id) => id !== breakfastId)
        : [...currentMemberSelection.breakfast, breakfastId]
      const stillNeedsToppings = nextBreakfasts.some(
        (id) => BREAKFAST_LOOKUP[id]?.requiresToppings,
      )

      return {
        ...currentSelections,
        [currentMember]: {
          ...currentMemberSelection,
          breakfast: nextBreakfasts,
          toppings: stillNeedsToppings ? currentMemberSelection.toppings : [],
        },
      }
    })
  }

  const handleDinnerSelect = (dinnerId) => {
    setSelections((currentSelections) => {
      const currentMemberSelection = currentSelections[currentMember]
      const isSelected = currentMemberSelection.dinner.includes(dinnerId)

      return {
        ...currentSelections,
        [currentMember]: {
          ...currentMemberSelection,
          dinner: isSelected
            ? currentMemberSelection.dinner.filter((id) => id !== dinnerId)
            : [...currentMemberSelection.dinner, dinnerId],
        },
      }
    })
  }

  const toggleTopping = (toppingId) => {
    setSelections((currentSelections) => {
      const currentMemberSelection = currentSelections[currentMember]
      const toppingExists = currentMemberSelection.toppings.includes(toppingId)

      return {
        ...currentSelections,
        [currentMember]: {
          ...currentMemberSelection,
          toppings: toppingExists
            ? currentMemberSelection.toppings.filter((topping) => topping !== toppingId)
            : [...currentMemberSelection.toppings, toppingId],
        },
      }
    })
  }

  const saveCurrentSelection = () => {
    if (currentSelection.breakfast.length === 0 || currentSelection.dinner.length === 0) {
      return
    }

    if (allComplete) {
      if (!hasArchivedCurrentMenu) {
        archiveCurrentMenu()
      }
      setScreen('summary')
      return
    }

    setCurrentMember(findNextIncompleteMember(currentMember))
  }

  return (
    <div className="persona-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-14 h-44 w-44 rotate-12 rounded-[2.5rem] bg-[#ff4aa7]/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 -translate-y-1/3 translate-x-1/4 rounded-full bg-[#ff8aca]/18 blur-3xl" />
        <div className="absolute bottom-6 left-1/3 h-60 w-60 -rotate-12 rounded-full bg-[#ff2e97]/14 blur-3xl" />
        <div className="absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-[#ffd2ea]/50 to-transparent" />
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 md:px-8 md:py-7">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#ffb7dd]">
              Morning Rotation
            </p>
            <h1 className="font-display text-3xl uppercase tracking-[0.1em] text-[#2d1621] md:text-5xl">
              Family Meal Menu
            </h1>
            <p className="mt-2 text-sm font-medium text-[#6d4558] md:text-base">{todayLabel}</p>
          </div>
          <div className="persona-badge">
            <span className="text-xs uppercase tracking-[0.35em] text-[#8f5c74]">
              Family Queue
            </span>
            <span className="font-display text-xl uppercase tracking-[0.12em] text-[#2d1621]">
              {completedCount} / {FAMILY_MEMBERS.length}
            </span>
          </div>
        </header>

        {screen === 'intro' && (
          <section className="stage-enter grid flex-1 gap-5 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="persona-panel flex flex-col justify-between gap-8 px-6 py-8 md:px-10 md:py-10">
              <div>
                <p className="mb-3 inline-flex bg-[#ff2e97] px-3 py-1 text-xs font-bold uppercase tracking-[0.35em] text-white shadow-[6px_6px_0_rgba(0,0,0,0.25)]">
                  iPad Breakfast + Dinner Flow
                </p>
                <h2 className="max-w-3xl font-display text-4xl uppercase leading-none tracking-[0.06em] text-[#2d1621] md:text-6xl">
                  Quick picks, flexible turn order, and a clean summary for Mom.
                </h2>
                <p className="mt-5 max-w-2xl text-base text-[#5f3b4d] md:text-lg">
                  Each family member can jump in at any time, lock in breakfast and
                  dinner, and add toppings only when the chosen breakfast needs them.
                  When all four people are complete, the app flips to a polished recap
                  screen.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {FAMILY_MEMBERS.map((member, index) => (
                  <div key={member} className="intro-member-card">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8f5c74]">
                      Player {index + 1}
                    </span>
                    <span className="font-display text-2xl uppercase tracking-[0.12em] text-[#2d1621]">
                      {member}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button type="button" className="persona-button" onClick={startFlow}>
                  Start
                </button>
                <p className="max-w-md text-sm text-[#6d4558]">
                  Built with React state only, so it is simple now and easy to expand
                  later with more meals, toppings, or family members.
                </p>
              </div>
            </div>

            <aside className="persona-panel stage-enter flex flex-col justify-between gap-6 px-6 py-8 md:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#ffb7dd]">
                  Today&apos;s Menu
                </p>
                <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.1em] text-[#2d1621]">
                  Breakfast + Dinner Picks
                </h2>
                <p className="mt-4 text-sm text-[#5f3b4d] md:text-base">
                  The menu now supports a larger bilingual list, direct sibling
                  switching, and sub-options like toppings only when they are actually
                  relevant.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="feature-card">
                  <span className="feature-tag">Breakfast</span>
                  <p>Large mixed breakfast list with Chinese labels.</p>
                </div>
                <div className="feature-card">
                  <span className="feature-tag">Dinner</span>
                  <p>Full dinner options with bilingual naming.</p>
                </div>
                <div className="feature-card">
                  <span className="feature-tag">Flow</span>
                  <p>Tap any sibling card on the right to edit them anytime.</p>
                </div>
                <div className="feature-card">
                  <span className="feature-tag">History</span>
                  <p>Past menus are saved on this device so repeats are easy to spot.</p>
                </div>
              </div>
            </aside>
          </section>
        )}

        {screen === 'select' && (
          <section
            key={`select-${currentMember}`}
            className="stage-enter grid flex-1 gap-5 lg:grid-cols-[1.45fr_0.8fr]"
          >
            <div className="order-2 persona-panel px-5 py-6 md:px-8 md:py-8 lg:order-1">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#ffb7dd]">
                    {todayLabel}
                  </p>
                  <h2 className="mt-2 font-display text-4xl uppercase tracking-[0.1em] text-[#2d1621] md:text-5xl">
                    {currentMember}
                  </h2>
                </div>
                <div className="w-full max-w-sm">
                  <div className="mb-2 flex justify-between text-xs font-semibold uppercase tracking-[0.28em] text-[#8f5c74]">
                    <span>Progress</span>
                    <span>{completedCount} / 4 Saved</span>
                  </div>
                  <div className="h-3 overflow-hidden bg-[#f5d9e6]">
                    <div
                      className="h-full bg-linear-to-r from-[#ff2e97] via-[#ff79c4] to-[#ffd6ec] transition-all duration-500"
                      style={{
                        width: `${(completedCount / FAMILY_MEMBERS.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="section-panel">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffb7dd]">
                        Breakfast
                      </p>
                      <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-[#2d1621]">
                        Choose A Main Item
                      </h3>
                    </div>
                    <p className="text-sm text-[#6d4558]">Tap one or more cards to select.</p>
                  </div>

                  <div className="grid gap-3 xl:grid-cols-2">
                    {BREAKFAST_OPTIONS.map((option) => (
                      <ChoiceCard
                        key={option.id}
                        title={option.label}
                        description={option.chinese}
                        selected={currentSelection.breakfast.includes(option.id)}
                        onClick={() => handleBreakfastSelect(option.id)}
                      />
                    ))}
                  </div>

                  {showToppings && (
                    <div className="mt-5 rounded-none border border-[#f0d1de] bg-white p-4 md:p-5">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffb7dd]">
                            Toppings
                          </p>
                          <p className="mt-1 text-sm text-[#6d4558]">
                            This subcategory appears only for breakfasts that need extra
                            toppings.
                          </p>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8f5c74]">
                          {currentSelection.toppings.length} Selected
                        </span>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {TOPPING_OPTIONS.map((topping) => (
                          <ToppingChip
                            key={topping.id}
                            label={`${topping.label} · ${topping.chinese}`}
                            selected={currentSelection.toppings.includes(topping.id)}
                            onClick={() => toggleTopping(topping.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="section-panel">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffb7dd]">
                        Dinner
                      </p>
                      <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-[#2d1621]">
                        Choose Dinner
                      </h3>
                    </div>
                    <p className="text-sm text-[#6d4558]">Tap one or more dinner choices.</p>
                  </div>

                  <div className="grid gap-3 xl:grid-cols-2">
                    {DINNER_OPTIONS.map((option) => (
                      <ChoiceCard
                        key={option.id}
                        title={option.label}
                        description={option.chinese}
                        selected={currentSelection.dinner.includes(option.id)}
                        onClick={() => handleDinnerSelect(option.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <aside className="order-1 flex flex-col gap-5 lg:order-2 lg:sticky lg:top-6 lg:h-fit">
              <div className="persona-panel px-5 py-6 md:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffb7dd]">
                  Queue
                </p>
                <div className="mt-4 space-y-3">
                  {FAMILY_MEMBERS.map((member, index) => {
                    const isCurrent = index === currentIndex
                    const isDone = selections[member].breakfast && selections[member].dinner

                    return (
                      <button
                        type="button"
                        key={member}
                        onClick={() => setCurrentMember(member)}
                        className={`member-row ${isCurrent ? 'member-row-current' : ''} ${
                          isDone ? 'member-row-complete' : ''
                        }`}
                      >
                        <span
                          className={`text-xs font-semibold uppercase tracking-[0.3em] ${
                            isCurrent ? 'text-white/75' : 'text-[#8f5c74]'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`font-display text-xl uppercase tracking-[0.1em] ${
                            isCurrent ? 'text-white' : 'text-[#2d1621]'
                          }`}
                        >
                          {member}
                        </span>
                        <span
                          className={`ml-auto text-xs font-semibold uppercase tracking-[0.28em] ${
                            isCurrent ? 'text-white/75' : 'text-[#8f5c74]'
                          }`}
                        >
                          {getMemberStatus(member)}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="persona-panel flex-1 px-5 py-6 md:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffb7dd]">
                  Live Preview
                </p>
                <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.1em] text-[#2d1621]">
                  {currentMember}
                </h3>
                <div className="mt-4">
                  <SummaryRow
                    label="Breakfast"
                    value={formatOptionLabels(selectedBreakfasts)}
                  />
                  <SummaryRow
                    label="Toppings"
                    value={
                      showToppings
                        ? formatToppings(currentSelection.toppings, true)
                        : 'Not needed'
                    }
                  />
                  <SummaryRow
                    label="Dinner"
                    value={formatOptionLabels(selectedDinners)}
                  />
                </div>

                <button
                  type="button"
                  onClick={saveCurrentSelection}
                  disabled={
                    currentSelection.breakfast.length === 0 ||
                    currentSelection.dinner.length === 0
                  }
                  className="persona-button mt-6 w-full disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:scale-100"
                >
                  {allComplete ? 'Finish Menu' : 'Save & Next'}
                </button>
              </div>
            </aside>
          </section>
        )}

        {screen === 'summary' && (
          <section className="stage-enter flex flex-1 flex-col gap-5">
            <div className="persona-panel px-6 py-8 md:px-8 md:py-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#ffb7dd]">
                    Mom&apos;s View
                  </p>
                  <h2 className="mt-2 font-display text-4xl uppercase tracking-[0.1em] text-[#2d1621] md:text-5xl">
                    Final Meal Summary
                  </h2>
                  <p className="mt-2 text-sm font-medium text-[#6d4558] md:text-base">{todayLabel}</p>
                  <p className="mt-3 max-w-2xl text-sm text-[#5f3b4d] md:text-base">
                    Everyone has locked in breakfast and dinner. This is the clean
                    morning recap screen for the household.
                  </p>
                </div>

                <button type="button" className="persona-button" onClick={resetAll}>
                  Start Over
                </button>
              </div>
            </div>

            <div className="grid flex-1 gap-5 md:grid-cols-2">
              {FAMILY_MEMBERS.map((member, index) => {
                const selection = selections[member]

                return (
                  <article key={member} className="summary-card stage-enter">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8f5c74]">
                          Family Member {index + 1}
                        </p>
                        <h3 className="font-display text-3xl uppercase tracking-[0.1em] text-[#2d1621]">
                          {member}
                        </h3>
                      </div>
                      <span className="inline-flex bg-[#ff2e97] px-3 py-1 text-xs font-bold uppercase tracking-[0.28em] text-white shadow-[5px_5px_0_rgba(0,0,0,0.22)]">
                        Saved
                      </span>
                    </div>

                    <SummaryRow
                      label="Breakfast"
                      value={formatOptionLabels(
                        normalizeChoiceIds(selection.breakfast).map(
                          (breakfastId) => BREAKFAST_LOOKUP[breakfastId],
                        ),
                      )}
                    />
                    <SummaryRow
                      label="Selected Toppings"
                      value={
                        normalizeChoiceIds(selection.breakfast).some(
                          (breakfastId) => BREAKFAST_LOOKUP[breakfastId]?.requiresToppings,
                        )
                          ? formatToppings(selection.toppings, true)
                          : 'Not needed'
                      }
                    />
                    <SummaryRow
                      label="Dinner"
                      value={formatOptionLabels(
                        normalizeChoiceIds(selection.dinner).map(
                          (dinnerId) => DINNER_LOOKUP[dinnerId],
                        ),
                      )}
                    />
                  </article>
                )
              })}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="persona-panel px-6 py-6 md:px-8">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[#ffb7dd]">
                      Past Orders
                    </p>
                    <h3 className="font-display text-3xl uppercase tracking-[0.1em] text-[#2d1621]">
                      Recent Menu History
                    </h3>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8f5c74]">
                    Stored On This Browser
                  </span>
                </div>

                {recentHistory.length > 0 ? (
                  <div className="space-y-4">
                    {recentHistory.map((entry) => (
                      <article
                        key={entry.id}
                        className="rounded-none border border-[#f0d1de] bg-[#fff7fb] p-4"
                      >
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                          <h4 className="font-display text-xl uppercase tracking-[0.1em] text-[#2d1621]">
                            {entry.dateLabel}
                          </h4>
                          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8f5c74]">
                            Saved Menu
                          </span>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                          {FAMILY_MEMBERS.map((member) => {
                            const memberSelection = entry.selections?.[member]

                            return (
                              <div
                                key={`${entry.id}-${member}`}
                                className="rounded-none border border-[#f0d1de] bg-white p-3"
                              >
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8f5c74]">
                                  {member}
                                </p>
                                <p className="mt-2 text-sm text-[#5f3b4d]">
                                  Breakfast:{' '}
                                  {formatOptionLabels(
                                    normalizeChoiceIds(memberSelection?.breakfast).map(
                                      (breakfastId) => BREAKFAST_LOOKUP[breakfastId],
                                    ),
                                  )}
                                </p>
                                <p className="mt-1 text-sm text-[#5f3b4d]">
                                  Dinner:{' '}
                                  {formatOptionLabels(
                                    normalizeChoiceIds(memberSelection?.dinner).map(
                                      (dinnerId) => DINNER_LOOKUP[dinnerId],
                                    ),
                                  )}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#5f3b4d]">
                    No past menus yet. Once you finish a full family menu, it will be saved
                    here automatically.
                  </p>
                )}
              </div>

              <div className="grid gap-5">
                {FAMILY_MEMBERS.map((member) => (
                  <RepeatWatchCard
                    key={`repeat-${member}`}
                    member={member}
                    notes={buildRepeatNotes(member)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
