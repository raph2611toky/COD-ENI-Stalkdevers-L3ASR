import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";



export default function Animate({ children, delay, className, hidden, visible, transitionType, duration, stiffness }) {
    const ref = useRef(null);
    const isInview = useInView(ref, { once: true });
    const controls = useAnimation();

    useEffect(() => {
        if (isInview) {
            controls.start("visible");
        }
    }, [isInview]);


    console.log('====================================');
    console.log( (duration == null ? 0.2: duration));
    console.log('====================================');;
    return (
        <motion.div
            ref={ref}
            variants={{
                hidden: hidden,
                visible: visible,
            }}
            transition={{
                type: (transitionType == null? "spring": transitionType),
                duration: (duration == null ? 0.2: duration),
                damping: 8,
                delay: delay,
                stiffness:(stiffness == null ? 100: stiffness),
            }}
            initial="hidden"
            animate={controls}
            className={className}
        >
            {children}
        </motion.div>
    );
}