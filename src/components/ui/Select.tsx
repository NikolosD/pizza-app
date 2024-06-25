import clsx from 'clsx'
import React, {ComponentPropsWithoutRef} from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

const {Content, Group, Item, ItemText, Portal, Root, Trigger, Value, Viewport} = SelectPrimitive

export type SelectProps = {
    ariaLabel?: string
    className?: string
    label?: string
    options?: number[] | string[]
    pagination?: boolean
    placeholder?: string
} & ComponentPropsWithoutRef<typeof Root>


export const Select = React.forwardRef<React.ElementRef<typeof Root>, SelectProps>(
    (
        {ariaLabel, children, className, defaultValue, options, pagination, placeholder, ...props},
        forwardedRef
    ) => {
        const selectItems = options?.map(el => (
            <SelectItem key={el} value={String(el)}>
                {el}
            </SelectItem>
        ))
        // const classNames = {
        //     contentStyles: clsx(pagination ?? s.paginatedContent, s.selectContent),
        //     triggerStyles: clsx(s.selectTrigger, className, pagination ?? s.paginatedTrigger),
        // }
        return (
            <>
                <Root defaultValue={defaultValue} {...props}>
                    {/*<Trigger aria-label={ariaLabel} className={classNames.triggerStyles} ref={forwardedRef}>*/}
                    <Trigger aria-label={ariaLabel} ref={forwardedRef}>
                        {props.label}
                        <Value placeholder={placeholder}/>
                    </Trigger>
                    <Portal>
                        {/*<Content className={classNames.contentStyles} position={'popper'}>*/}
                        <Content position={'popper'}>
                            {/*<Viewport asChild className={s.selectViewport}>*/}
                            <Viewport asChild>
                                <Group>{selectItems}</Group>
                                {/*<Group className={s.selectGroup}>{selectItems}</Group>*/}
                            </Viewport>
                        </Content>
                    </Portal>
                </Root>
            </>
        )
    }
)
export const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({children, ...props}, forwardedRef) => {
    return (
        // <Item className={s.selectItem} {...props} ref={forwardedRef}>
        <Item  {...props} ref={forwardedRef}>
            <ItemText>{children}</ItemText>
        </Item>
    )
})
