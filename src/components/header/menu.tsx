import { motion } from "framer-motion";
import { useState } from "react"; // 假设需要从 React 导入 useState

// --- Helper stubs / Placeholders ---
// 这些是基于原始代码的占位符，请确保在您的项目中正确导入或定义它们
const useLogin = () => ({ loggedIn: false, login: () => console.log('login'), logout: () => console.log('logout'), userInfo: { avatar: '' }, enableLogin: true });
const useDark = () => ({ isDark: false, toggleDark: () => console.log('toggle dark') });
// const Homepage = "https://github.com/example/repo"; // 假设 Homepage 变量已定义
// const $ = (classes) => Array.isArray(classes) ? classes.join(' ') : classes; // 一个基础的类名助手占位符
// --- End Helper Stubs ---


// 主题切换组件 (未修改)
function ThemeToggle() {
  const { isDark, toggleDark } = useDark();
  return (
    <li onClick={toggleDark}>
      {/* 假设 $ 是一个类名处理函数或模板字符串 */}
      <span className={/* $( */`inline-block ${isDark ? "i-ph-moon-stars-duotone" : "i-ph-sun-dim-duotone"}`/* ) */} />
      <span>
        {isDark ? "浅色模式" : "深色模式"}
      </span>
    </li>
  );
}

// 菜单组件 (已移除 GitHub 相关项)
export function Menu() {
  const { loggedIn, login, logout, userInfo, enableLogin } = useLogin();
  const [shown, show] = useState(false);

  return (
    <span className="relative" onMouseEnter={() => show(true)} onMouseLeave={() => show(false)}>
      <span className="flex items-center scale-90">
        {
          enableLogin && loggedIn && userInfo.avatar
            ? (
                <button
                  type="button"
                  className="h-6 w-6 rounded-full bg-cover"
                  style={
                    {
                      backgroundImage: `url(${userInfo.avatar}&s=24)`,
                    }
                  }
                >
                </button>
              )
            : <button type="button" className="btn i-si:more-muted-horiz-circle-duotone" /> // 使用合适的图标类名
        }
      </span>
      {shown && (
        <div className="absolute right-0 z-99 bg-transparent pt-4 top-4">
          <motion.div
            id="dropdown-menu"
            // 假设 $ 是一个类名处理函数
            className={/* $( */[
              "w-200px",
              "bg-primary backdrop-blur-5 bg-op-70! rounded-lg shadow-xl",
            ].join(' ')/* ) */}
            initial={{
              scale: 0.9,
            }}
            animate={{
              scale: 1,
            }}
          >
            <ol className="bg-base bg-op-70! backdrop-blur-md p-2 rounded-lg color-base text-base">
              {enableLogin && (loggedIn
                ? (
                    <li onClick={logout}>
                      <span className="i-ph:sign-out-duotone inline-block" />
                      <span>退出登录</span>
                    </li>
                  )
                : (
                    <li onClick={login}>
                      <span className="i-ph:sign-in-duotone inline-block" />
                      <span>Github 账号登录</span>
                    </li>
                  ))}
              <ThemeToggle />
              {/* GitHub 相关的列表项已被移除 */}
            </ol>
          </motion.div>
        </div>
      )}
    </span>
  );
}

// 如果需要，你可以像这样导出它们 (取决于你的文件结构)
// export { ThemeToggle, Menu };
