// Course.jsx
import React, { useState, useEffect } from "react";
import CourseSidebar from "../components/onlineCourseComponents/CourseSidebar";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useSelector } from "react-redux";
import { hasUserPurchasedProduct } from "../config/orderService";
import {
  fetchCompletedLessons,
  markLessonCompleted,
} from "../config/courseProgressService";
import classNames from "classnames/bind";
import styles from "./Course.module.scss";
import getContrastTextColor from "../config/getContrastTextColor";
import lightenColorWithOpacity from "../utils/lightenColorWithOpacity";
import { LuMenu } from "react-icons/lu";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import LoadingScreen from "../components/utils/LoadingScreen";

const cx = classNames.bind(styles);

const Course = () => {
  const { courseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [modules, setModules] = useState([]);
  const [courseInfo, setCourseInfo] = useState({
    title: "",
    description: "",
    imageUrl: "",
    backgroundColor: "",
    primaryColor: "",
    titleFont: "",
  });
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [accessLoading, setAccessLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  const currentUser = useSelector((state) => state.auth.currentUser);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const ref = doc(db, "products", courseId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          const chaps = data?.course?.content?.chapters || [];
          setModules(chaps.filter((c) => c.published !== false));
          setCourseInfo({
            title: data?.course?.title || "",
            description: data?.course?.description || "",
            imageUrl: data?.course?.imageUrl || "",
            backgroundColor: data?.course?.backgroundColor || "",
            primaryColor: data?.course?.primaryColor || "",
            titleFont: data?.course?.titleFont || "",
            username: data?.username || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch course", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const verifyAccess = async () => {
      setAccessLoading(true);
      try {
        if (currentUser) {
          const purchased = await hasUserPurchasedProduct(
            currentUser.uid,
            courseId
          );
          if (purchased) {
            setHasAccess(true);
            return;
          }
        }
        const urlOrderId = searchParams.get("order");
        if (urlOrderId) {
          const ordRef = doc(db, "orders", urlOrderId);
          const ordSnap = await getDoc(ordRef);
          if (
            ordSnap.exists() &&
            ordSnap.data()?.status === "paid" &&
            ordSnap.data()?.productId === courseId
          ) {
            localStorage.setItem(`access_${courseId}`, urlOrderId);
            setHasAccess(true);
            return;
          }
        }
        const orderId = localStorage.getItem(`access_${courseId}`);
        if (orderId) {
          const ordRef = doc(db, "orders", orderId);
          const ordSnap = await getDoc(ordRef);
          if (
            ordSnap.exists() &&
            ordSnap.data()?.status === "paid" &&
            ordSnap.data()?.productId === courseId
          ) {
            setHasAccess(true);
            return;
          }
        }
        setHasAccess(false);
      } catch (err) {
        console.error("Failed to verify access", err);
        setHasAccess(false);
      } finally {
        setAccessLoading(false);
      }
    };
    verifyAccess();
  }, [courseId, currentUser, searchParams]);

  useEffect(() => {
    const loadProgress = async () => {
      if (!currentUser) return;
      const ids = await fetchCompletedLessons(currentUser.uid, courseId);
      setCompletedLessonIds(ids.map(String));
    };
    loadProgress();
  }, [currentUser, courseId]);

  const modulesWithProgress = modules.map((m) => {
    const lessons = m.lessons.map((l) => ({
      ...l,
      completed: completedLessonIds.includes(String(l.id)),
    }));
    const completedCount = lessons.filter((l) => l.completed).length;
    const moduleProgress = lessons.length
      ? Math.floor((completedCount / lessons.length) * 100)
      : 0;
    return {
      ...m,
      lessons,
      completed: moduleProgress === 100,
      progress: `${moduleProgress}%`,
    };
  });

  const allLessons = modulesWithProgress.flatMap((m) =>
    m.lessons.map((l) => ({
      ...l,
      moduleId: m.id,
      moduleTitle: m.title,
    }))
  );
  const lessonParam = searchParams.get("lesson_id");
  const defaultLesson = allLessons[0];
  const currentLesson =
    allLessons.find((l) => String(l.id) === String(lessonParam)) ||
    defaultLesson;

  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter((l) => l.completed).length;
  const progress = totalLessons
    ? Math.floor((completedLessons / totalLessons) * 100)
    : 0;

  useEffect(() => {
    if (currentLesson) {
      setVideoLoading(true);
    }
  }, [currentLesson?.id]);

  const handleLessonClick = (id) => {
    setSearchParams({ lesson_id: id });
    setSidebarOpen(false);
  };

  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevLesson) handleLessonClick(prevLesson.id);
  };

  const handleNext = () => {
    if (nextLesson) handleLessonClick(nextLesson.id);
  };

  const handleVideoEnded = async () => {
    if (!currentUser) return;
    await markLessonCompleted(currentUser.uid, courseId, currentLesson.id);
    setCompletedLessonIds((prev) =>
      prev.includes(String(currentLesson.id))
        ? prev
        : [...prev, String(currentLesson.id)]
    );
  };

  const isLessonView = Boolean(lessonParam);

  const handleMenuBtn = () => setSidebarOpen((prev) => !prev);

  const goCourseHome = () => {
    setSidebarOpen(false);
    navigate(`/course/${courseId}`);
  };

  const colors = {
    primary: courseInfo.primaryColor || "#0f766e",
    secondary: courseInfo.backgroundColor || "#ffffff",
  };

  const sidebarBackground = lightenColorWithOpacity(colors.primary, 90);

  const styleVars = {
    "--template-font-family": courseInfo.titleFont
      ? `'${courseInfo.titleFont}', sans-serif`
      : undefined,
    "--template-color-primary": colors.primary,
    "--template-color-secondary": colors.secondary,
    "--sidebar-background": sidebarBackground,
    "--template-text-color": getContrastTextColor(colors.secondary),
    "--template-button-text-color": getContrastTextColor(colors.primary),
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!accessLoading && !hasAccess) {
    return (
      <div className={cx("noAccess")}>
        Bạn chưa mua khóa học này.
        {courseInfo.username && (
          <button
            onClick={() => navigate(`/${courseInfo.username}/${courseId}`)}
          >
            Mua khóa học
          </button>
        )}
      </div>
    );
  }

  if (!currentLesson) {
    return <div>Không tìm thấy khóa học</div>;
  }

  return (
    <div className={cx("container")} style={styleVars}>
      <div className={cx("mainContent")}>
        {isLessonView ? (
          <>
            <div className={cx("videoSection")}>
              <div className={cx("videoContainer")}>
                {videoLoading && (
                  <div className={cx("videoOverlay")}>
                    <div className={cx("spinner")} />
                  </div>
                )}
                <video
                  key={currentLesson.id}
                  className={cx("videoFrame")}
                  src={currentLesson.videoUrl}
                  controls
                  onEnded={handleVideoEnded}
                  onLoadedData={() => setVideoLoading(false)}
                  style={{ display: videoLoading ? "none" : "block" }}
                />
              </div>
            </div>
            <div className={cx("lessonContent")}>
              <h1 className={cx("lessonTitle")}>{currentLesson.title}</h1>
              {currentLesson.description && (
                <div
                  className={cx("lessonText")}
                  dangerouslySetInnerHTML={{
                    __html: currentLesson.description,
                  }}
                />
              )}
              <div className={cx("lessonNavButtons")}>
                {prevLesson && (
                  <div onClick={handlePrev} className={cx("navButton")}>
                    <GrFormPrevious size={24} />
                    <div className={cx("navTexts")}>
                      <span className={cx("navNote")}>Trước đó:</span>

                      <span className={cx("navTitle")}>{prevLesson.title}</span>
                    </div>
                  </div>
                )}
                {nextLesson && (
                  <div
                    onClick={handleNext}
                    className={cx("navButton")}
                    style={{ justifyContent: "end" }}
                  >
                    <div className={cx("navTexts")}>
                      <span className={cx("navNote")}>Bài học kế tiếp:</span>
                      <span className={cx("navTitle")}>{nextLesson.title}</span>
                    </div>
                    <MdNavigateNext size={24} />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {courseInfo.imageUrl && (
              <div className={cx("courseImageWrapper")}>
                <img
                  src={courseInfo.imageUrl}
                  alt="course"
                  className={cx("courseImage")}
                />
              </div>
            )}
            <div className={cx("lessonContent")}>
              <h1 className={cx("lessonTitle")}>{courseInfo.title}</h1>
              {courseInfo.description && (
                <div
                  className={cx("lessonText")}
                  dangerouslySetInnerHTML={{ __html: courseInfo.description }}
                />
              )}
              {allLessons[0] && (
                <button
                  onClick={() => handleLessonClick(allLessons[0].id)}
                  className={cx("startBtn")}
                >
                  Bắt đầu học
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className={cx("desktopSidebar")}>
        <CourseSidebar
          title={courseInfo.title}
          modules={modulesWithProgress}
          currentLesson={currentLesson}
          onLessonClick={handleLessonClick}
          progress={progress}
          goCourseHome={goCourseHome}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={cx("mobileSidebar", { open: sidebarOpen })}
        onClick={() => setSidebarOpen(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <CourseSidebar
            title={courseInfo.title}
            modules={modulesWithProgress}
            currentLesson={currentLesson}
            onLessonClick={handleLessonClick}
            progress={progress}
            goCourseHome={goCourseHome}
          />
        </div>
      </div>

      <div className={cx("mobileBottomBar")}>
        <button className={cx("bottomMenuButton")} onClick={handleMenuBtn}>
          <LuMenu size={24} />
        </button>
        <span className={cx("mobileCourseTitle")}>
          {isLessonView ? currentLesson.title : courseInfo.title}
        </span>
      </div>
    </div>
  );
};

export default Course;
