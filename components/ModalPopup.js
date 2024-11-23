import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function DialogPopup({ triggerText, title, description, primaryButtonText, secondaryButtonText, onPrimaryAction, onSecondaryAction }) {
	const [open, setOpen] = useState(false);

	const handlePrimaryAction = () => {
		onPrimaryAction();
		setOpen(false);
	};

	const handleSecondaryAction = () => {
		onSecondaryAction();
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">{triggerText}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="secondary" onClick={handleSecondaryAction}>
						{secondaryButtonText}
					</Button>
					<Button onClick={handlePrimaryAction}>{primaryButtonText}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
